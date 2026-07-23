const main = async () => {
	const response = await fetch("/blog/posts.json")
	const posts = await response.json()
	const blogPostList = document.querySelector("#blog-post-list")
	for (const post of posts) {
		const li = document.createElement("li")
		li.textContent = post.title
		blogPostList.appendChild(li)
	}
}
main()
