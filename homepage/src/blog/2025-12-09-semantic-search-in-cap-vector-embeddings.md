# Semantic search in CAP (Node.js): vector embeddings and cosine similarity

*In this blog post I report on my recent experiments and findings on how to implement a semantic search in [CAP](https://cap.cloud.sap/docs/) Node.js. The goal for the search mechanism was to be able to find the item in an entity with the best semantic match based on a user query (prompt). This can be achieved using (local) vector embeddings and a cosine similarity search. I was pleasantly surprised how easy it is to handle vector embeddings locally without the need for an actual (vector) database (at least when not considering scaling).*

While watching the Devtoberfest 2025 session on [Agentic Coding with CAP](https://www.youtube.com/watch?v=vvSrbsiIfmA) by [David Kunz](https://community.sap.com/t5/user/viewprofilepage/user-id/202584), I was intrigued to inspect the source code of the [CAP mcp-server](https://github.com/cap-js/mcp-server) that was talked about. Turns out, the `search_docs` tool of the server is implemented using vector embeddings and a cosine similarity search. This sparked my interest to explore this topic further and see how the concept can be applied to other scenarios as well.

To start off, I will give you my understanding of vector embeddings (which might not be scientifically accurate, but is sufficient for applying the concept): Vector embeddings are numerical representations of data. Each vector has a lot of dimensions and a numerical value for each of the dimensions. The number of dimensions depends on the embedding model used. Data that has similar meaning, let's say "banana" and "apple", will also be closer to each other in the dimensional space than "banana" and "computer". It is important to note that you can only compare vectors that were created using the same embedding model, as a comparison requires the same number of dimensions with the same meaning. This concept is fundamental to how large-language models work. To create vector embeddings in a (CAP) Node.js application, this is all we need:

```javascript
import { pipeline } from "@xenova/transformers"
const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")

const data = [
	{
		text: "banana"
	},
	{
		text: "apple"
	}
]

const createEmbeddings = async () => {
	for (const item of data) {
		const embedding = await embedder(item.text, { pooling: "mean", normalize: true })
		item.embedding = JSON.stringify(Array.from(embedding.data))
	}
	return data
}

console.log(await createEmbeddings()) // [{ text: 'banana', embedding: '[-0.057455405592918396,0.03617725893855095 ...
```

Going back to the original quest of implementing a semantic search, the next step is to compare the vector embedding of a user query with the vector embeddings of the existing items. For that, we use a cosine similarity search. The cosine similarity is a measure that calculates the cosine of the angle between two vectors in a multi-dimensional space. The result is a value between -1 and 1, where 1 means the vectors are identical, 0 means there is no similarity, and -1 means they are completely opposite. The principle here is that vectors that have a smaller angle between them (are closer to each other) are more similar in meaning. To calculate the cosine similarity between two vectors, we can use the following code:

```javascript
// see code sample above for creating embeddings

import cosineSimilarity from "cosine-similarity"

const search = "computer"
const searchEmbedding = await embedder(search, { pooling: "mean", normalize: true })
const results = data.map(item => ({
	text: item.text,
	similarity: cosineSimilarity(Array.from(searchEmbedding.data), JSON.parse(item.embedding)).toFixed(4)
}))
console.log(results) // [ { text: 'banana', similarity: '0.4076' }, { text: 'apple', similarity: '0.5369' } ]
```

The [cosine-similarity](https://www.npmjs.com/package/cosine-similarity) module essentially does all the heavy lifting for us. After creating the embedding for the search ("computer"), we compare it with each of the existing embeddings to get a similarity score. The higher the score, the similar the data is in meaning. As we can the in the logged result, "computer" is more similar to "apple" (0.5369) than to "banana" (0.4076) - for obvious reasons.

The next step is to integrate this search mechanism into a CAP application. I create a simple CAP service with a `Products` entity, that also exposed a `semanticSearch` function. In the handler for that function, we create the same logic as shown in the code sample above. The only difference is that we now fetch the existing items from the database (embeddings stored a string) and return the items sorted by their similarity to the search term. It is important to note that we create the embeddings not in the actual search handler, but during the initialization of the service - for obvious performance reasons.

```javascript
import { pipeline } from "@xenova/transformers"
import cosineSimilarity from "cosine-similarity"

export default async function catalog() {
	const products = this.entities["Products"]
	const data = await SELECT.from(products)
	const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
	for (const item of data) {
		const embedding = await embedder(item.text, { pooling: "mean", normalize: true })
		await UPDATE(products, item.ID).with({ embedding: embedding.data })
	}

	this.on("semanticSearch", async (req) => {
		const { search } = req.data
		const data = await SELECT.from(products)
		let results
		const searchEmbedding = await embedder(search, { pooling: "mean", normalize: true })
		results = data.map(item => ({
			...item,
			similarity: cosineSimilarity(Array.from(searchEmbedding.data), JSON.parse(item.embedding))
		}))
		results.sort((a, b) => b.similarity - a.similarity)
		for (const result of results) {
			delete result.embedding
		}
		return results
	})
}
```

Please note that this sample won't scale for large datasets, as we are loading all items into memory for the search. Also, we are storing the embeddings in the database as strings, which is not ideal. For larger datasets, a vector database like SAP HANA Cloud would be more appropriate. However, for smaller applications or testing/learning purposes, this approach should work fine.

We can now test this semantic search by calling `http://localhost:4004/odata/v4/catalog/semanticSearch(search='computer')`, which returns the following data:

```json
{
    "@odata.context": "$metadata#Products",
        "value": [
            {
                "ID": 1,
                "text": "apple",
                "similarity": 0.5369198543970098
            },
            {
                "ID": 2,
                "text": "banana",
                "similarity": 0.40761179144643095
            }
        ]
}
```

Now let's the if customers would find the banane if they searched for `/semanticSearch(search='yellow fruit with curved shape')`:

```json
{
    "@odata.context": "$metadata#Products",
        "value": [
            {
                "ID": 2,
                "text": "banana",
                "similarity": 0.40374334839388043
            },
            {
                "ID": 1,
                "text": "apple",
                "similarity": 0.2445011304736103
            }
        ]
}
```

And that's how we can implement a true semantic search in a CAP Node.js application! I was pleasantly surprised how easy it is to create and handle vector embeddings locally without the need for an actual vector database (at least for smaller datasets). Also, we didn't need to rely on any external APIs to large-language models or the like, the embedding model runs completely locally.

I hope you like this and maybe learned something new - I certainly did.
