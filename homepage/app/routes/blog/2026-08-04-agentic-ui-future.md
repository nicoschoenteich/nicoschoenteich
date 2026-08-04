---
topic: "star"
description: ""
---

# A few thoughts on AI agents, and how they change the user interface

_I have no doubt that the future of enterprise software is agentic, but that's only one part of the story. An army of AI agents doesn't make an ERP. We will always need a strong deterministic core containing the business logic, which the agents can then sit on top off, deciding which logic to trigger based on the user's intent. And speaking of the user, what will their interface for this experience look like? In this post I want to share my thoughts on the co-evolution of the user interface (UI), that happens right alongside the evolution of AI agents. In my opinion, this UI evolution should be seen as just as important, and tackled as a its own engineering and user experience challenge, with great rewards waiting on the other side of it._

In most recent history, generative AI (most prominently large language models, or LLMs), gave birth to a new generation of bots/workflows/automations/scripts, which we call AI agents. They are incredibly powerful and flexible, as they are able to combine the mentioned paradigms and technologies with the "reasoning" and "intelligence" (calculating probabilities, predicting tokens) of LLMs. On top of that, the [model context protocol (MCP)](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) enables AI agents to connect to any tool or data source, equipping them with even more (specific) knowledge and capabilities. By combining the best of multiple technology layers, from terminal commands/bash scripting to complex reasoning with LLMs, they are the answer to every question in the omnipresent discussion of how business software is evolving in the future, and probably rightfully so.

## Status quo: chat window

Most users of AI agents and AI in general have accepted – and probably don't question – the fact that the user interface to this new technology is a chat window with plain text (maybe formatted, if you're lucky), at least for now. But I don't think this is what it's going to be like forever, especially not in the enterprise context, which is naturally complex. Instead, I think it's a temporary state, a result of the pace of change being too fast for our static UIs to co-develop. AI is becoming more capable, and it does that faster than our static/predefined UIs can adapt. Simply put, there was not enough time (until now?) to think about how to meaningfully integrate this new technology into existing applications and user journeys, so we simply created a separate application. This is no criticism, it is a perfectly rational strategy, but it's not the final destination. Currently, there is the "classic" UI, with your tables, forms, charts, buttons – and then there is the chat window, where you can ask questions and send agents to work, but the two artifacts almost never talk to each other. Maybe they are not even aware of each other. A wall of text is not the ideal way to present any kind of structured data, so we have to think about the agentic UI of the future.

## The agentic UI of the future

I think it's safe to assume that the (agentic) UI of the future is going to be some kind of mix between a static UI, one that was previously developed and configured, and a dynamic, conversational UI, one that evolves with the conversation. But is the UI paradigm going to be static UI first, with conversations sprinkled in where it makes sense? Or is it going to be chat first, with UI generation on the fly? Or is it going to be both, based on the use case? Or something else entirely?

Honest answer, I don't know. But I think those are the right questions to ask, and those are the things we have to experiment with. No one has a  crystal ball to predict the future, so we have to build it. And (thanks to AI) building things has never been easier. Let's "throw spaghetti against the wall and see if it sticks" 🍝

In the meantime, I will give you my thoughts on both of the core approaches I mentioned:

### Static UI first?

This approach feels like the least invasive, but also least progressive one, as it means we would keep our beloved developing models and frameworks. Our static UIs visualizing business data and processes would remain the foundation and UI investments of the recent history would be safe. We would just "AI enable" certain parts of the UI. For client-side code, I could imagine a chat [web component](https://www.webcomponents.org/) that is being reused everywhere and connects to an agent equivalent of the UI element. Instead of manually reading data in a table, or editing a page, you could chat with that table, or chat with that object page, and let agents do the work. Preserving context between different chat instances would be a challenge, but doable. For server-side code (metadata-driven approach like SAP Fiori elements), a static UI could be enhanced via an annotation that would AI/chat enable the UI representation of certain parts of the data model. A similar (not yet agentic approach) is already part of the [@cap-js/ai](https://github.com/cap-js/ai) plugin, that uses the `@UI.RecommendationState` annotation and leverages [SAP-RPT-1](https://help.sap.com/docs/sap-ai-core/generative-ai/sap-rpt-1?version=CLOUD) for value help recommendations.

A big advantage I see with this approach is consistency. We get used to our user interfaces and learn them very well. We get very fast and efficient using them. I invite you to the following thought experiment: Close your eyes and think about where your favorite messaging app on your phone's home screen is, or where you have to tap to open the camera. I'm sure you know this by heart. Why would you want this UI to change?

### Chat first?

For this approach, (client-side rendering) frontend applications as we know them today would probably no longer be relevant. Rather, the AI engine and agents powering the chat window would generate UI snippets on the fly based on the task and data at hand. Want to display structured data? Quickly generate a minimal table or chart. Want to give the user options to trigger processes? Additionally render a few buttons. Need a more complex UI? Simply render that on the fly. Obviously, there are a few central aspects to consider with this approach:
- How do you ensure consistency? Is that an [agentic skill](https://agentskills.io/home) intrinsic to the chat itself? Or do you provide a set of templates for UI snippets?
- How can you avoid burning unnecessary tokens? Is templating the answer for this too?
- How do you ensure performance? LLMs take time to responses, the whole UI shouldn't depend on it.
- How do you avoid rewriting every application? Is there some kind of migration path for existing client-side rendering applications to expose parts of their UI as templates for chat consumption?
- Or will we see a big push towards server-side rendering? OData services already provide an API to query data. Adding an additional endpoint to fetch the respective UI too could be exactly what a chat agent needs. Interestingly, the OData metadata document already contains the information on how data should be displayed.

## Conclusion

As you probably noticed, this last "Chat first?" paragraph contained a lot more question marks than "Static UI first?", but that doesn't mean the chat  first approach is less likely to be the agentic UI paradigm of the future. It just means that I have a harder time imagining that scenario, since it represents a greater shift. In fact, I think it is exactly this greater shift that will make this approach win. The consistency and performance problems are engineering problems, and those tend to get solved sooner or later. The flexibility gains you get from dynamically generating lightweight UI elements on the other hand are fantastic. And this might enable the best user experiences we have ever seen. Even if the best user experience is not a chat with a fully dynamic UI all the time, having the option to generate content dynamically is great. Dynamic doesn't exclude static, but static excludes dynamic.

I really hope this post ages well. But even if it doesn't, I'm happy as long as it inspires discussions. I any case, I am very much looking forward to everybody's thoughts and opinions.

_This blog post was written by hand, without any AI assistance._
