---
title: "Quick tip: event/task scheduling in CAP Node.js (in alpha state)"
topic: "cap"
date: "2025-10-30"
---

# Quick tip: event/task scheduling in CAP Node.js (in alpha state)

_This is just a quick note about a discovery I made in [capire](https://cap.cloud.sap/docs/). SAP CAP (Node.js) will support task scheduling (including callbacks) for events (actions/functions are also events) in a future release. This is potentially very useful for building AI agents. The feature is currently still in alpha state, so it may change._

The [capire release notes for May 2025](https://cap.cloud.sap/docs/releases/archive/2025/may25#event-scheduling) mention one feature that I personally think could be extremely valuable in the future: **event/task scheduling**. See [this section in capire](https://cap.cloud.sap/docs/node.js/queue#additional-apis) for all the details. This is what it (currently) looks like:

```javascript
await this.schedule('someEvent').every('2s')
this.after('someEvent/#succeeded', (data, req) => {
  // do something
  console.log(data)
})
```

This means you can set up you CAP applications to do things on a certain schedule, similar to a job scheduler. The application can emit events, or call actions/functions on its own without requiring another application or user to trigger it. I personally think this is a great addition to CAP and potentially very useful - especially if the think about AI agents that do things on their own, on a predefined schedule. This feature could be a starting point and building block for this.

Bold hypothesis: We might see CAP as the implementation foundation for (code-based) AI agents in the SAP ecosystem in the future. CAP is great for consuming (connecting) SAP systems and adding custom logic (code) to these connections. Time will tell.

Give it a try and let me know what you think! Keep in mind that this feature is still in alpha state and may change any time.
