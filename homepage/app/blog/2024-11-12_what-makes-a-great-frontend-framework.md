---
title: "On what makes a great frontend framework and why UI5 is one"
topic: "ui5"
date: "2024-11-12"
---

# On what makes a great frontend framework and why UI5 is one

_This blog post is about the qualities of an effective frontend framework and highlights UI5 as the best choice for modern, scalable, and future-proof web applications in the enterprise context. The purpose of this post is not to help you decide which frontend framework to choose for your next project, be it [UI5](https://ui5.sap.com/), [React](https://react.dev/), [Vue.js](https://vuejs.org/), [Svelte](https://svelte.dev/), or any combination of these ([Astro](https://astro.build/)). It's purpose is more to highlight the strengths of UI5 based on my personal experience. Therefore, any examples, details or explanations I present are not (meant to be) exhaustive and are presented from my personal point of view._

_I originally presented the content of this blog post at the [Flexso Tech Day 2024](https://community.sap.com/t5/sap-community/flexso-tech-day-2024/ev-p/13897666)._

## Qualities of a great frontend framework

When we think about what makes a great frontend framework (or any programming framework for that matter), we usually think along the lines of the following criteria:

- performance
- scalability
- flexibility
- stability
- libraries
- documentation
- community
- dev experience

These are all very important and valid aspects. In fact, a lot of frameworks have already checked those boxes. A few shine more in certain areas than others, but there is wide range frameworks that are great in these regards. However, there is one central aspect, that is by far the most important one (in my humble opinion):

**Getting things done.**

Even more importantly:

**Getting things done, fast. And make them last.**

In that regard, no other frameworks comes close to UI5. Let me explain.

## (1) The controls libraries vs. (2) the framework

I like to categorize UI5's capabilities and features in two main areas. One the one hand, there is the (1) control libraries. With more than 1000 controls available out-of-the-box, it is incredibly easy to build complex applications containing different layouts, tables, forms, charts, and more with little to no custom coding. Because of these controls, theming (SAP Fiori) and accessibility are also a breeze. Controls are well designed and simply enterprise ready. On the other hand, there is the (2) framework itself, with all its integrations, service connections, tooling, i18n features, and (closeness to the) core technology. See this quick list of built-in framework features (not exhaustive and in no particular order):

- integration into Fiori Launchpad
- service connections: OData(!), REST, you name it
- i18n
- p13n
- routing
- grow-as-you-go
- custom controls
- close to the core technologies: HTML, CSS, JavaScript

I will focus on this second area in this blog post and will now go into detail.

## The framework

### Grow-as-you-go

Unlike many other frontend frameworks, UI5 makes it very easy to get started. Essentially you only need two files: an `index.html` and one JavaScript file. An application like this doesn't even require a web server to work, because it is that simple (we will cover the aspect "closeness to core technologies" later). Of course, this kind of application doesn't make use of all the UI5 goodies available, nor does it follow its best practices, but it works - and that shows UI5's great design. Let's take a look at this simple example:

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>UI5 Walkthrough</title>
    <script
      id="sap-ui-bootstrap"
      src="https://ui5.sap.com/resources/sap-ui-core.js"
      data-sap-ui-async="true"
      data-sap-ui-on-init="module:ui5/walkthrough/index"
      data-sap-ui-resource-roots='{ "ui5.walkthrough": "./" }'
    ></script>
  </head>
  <body class="sapUiBody" id="content"></body>
</html>
```

index.js

```javascript
sap.ui.define(['sap/m/IllustratedMessage'], (IllustratedMessage) => {
  'use strict'

  new IllustratedMessage({
    title: 'Welcome to Flexso Tech Day 2024!',
    illustrationType: 'sapIllus-SuccessHighFive',
  }).placeAt('content')
})
```

![screen shot 0](/img/what-makes-a-great-frontend-framework/screen-shot0.png)

As you can see in the screen shot above, I simply opened the `index.html` file in my browser and the UI5 application was up and running. This is of course not how you would build "real" applications, but it does demonstrate how easy it is to get started. And I personally love starting with simple project setups like this and following a grow-as-you-go approach. It's just a nice feeling to actually know what each individual file is doing, instead of having 100 files and not knowing what half of them are for. And let's admit it, we've all been there.

### Custom controls

One of the great things about UI5 is that you can build your own custom controls. This sounds trivial, but it's actually a big deal, since you can operate within the UI5 framework and get all of its great features for free (see list above), while still being able to build anything you (or your customers) ever dreamed of. There is zero lock-in and you get the expensive part (in terms of coding effort) for free, like communicating with the backend. Fantastic, isn't it? Possibilities are endless. This is also due to the fact that UI5 itself is very close to its core technologies, namely HTML, CSS, and JavaScript. It means you can build your custom controls the same way, with technology you already know. Technically speaking, custom controls extend the `sap.ui.core.Control` class (or any higher level class that itself extends the base class), which is how they become part of the framework and its lifecycle. Let's create a simple custom control to really show how flexible and powerful at the same time UI5 is.

I generated a little starter project using the [easy-ui5 project generator](https://github.com/ui5-community/generator-ui5-project/), which support a monorepo approach. This way, we can keep our whole project (frontend, backend, and everything in between) in one well-managed (thanks to [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)) project. I ran the following commands and selected all default options. For the custom controls I created one "BasicList" and one "BasicListItem":

```bash
yo easy-ui5 project project
cd com.myorg.myui5project/
yo easy-ui5 project cap
yo easy-ui5 project customcontrol
yo easy-ui5 project customcontrol
```

The generated project structure looks like this (some artifacts omitted for brevity):

```text
- myui5app/
  - webapp/
    - control/
      - BasicList.js
      - BasicListItem.js
    - controller/
    - css/
    - i18n/
    - model/
    - test/
    - view/
    - Component.js
    - index.html
    - manifest.json
  - package.json
  - ui5.yaml
- server/
  - db/
    - data/
      - my.bookshop-Books.csv
    - schema.cds
  + srv/
  - package.json
  - xs-security.json
- mta.yaml
- package.json
```

The backend of the project is based on the SAP Cloud Application Programming Model and came with a tiny sample, the bookshop. I changed the data model to represent a session catalog (for the event this content was originally presented at) and added corresponding sample data. Since this blog post is about UI5, I will just show the new `schema.cds`, but not go into any more detail about building the backend:

```cds
namespace my.sessions;

using {cuid} from '@sap/cds/common';

entity Sessions : cuid {
    title    : String;
    abstract : String;
    speaker  : String;
}
```

Now for the frontend, we want to build a list of sessions that renders into simple HTML elements. Not just because it's simple, but because it shows that UI5 (and the underlying core technologies) is a blank canvas. _**If you can use UI5 to write HTML, CSS, and JavaScript, you can use it to write anything.**_ See it as your entry door to building frontend applications in the enterprise context. I know I am repeating myself, but with UI5 you have this flexibility _**on top**_ of the (1) control libraries and (2) the framework.

Let's start with the `BasicList.js`:

```javascript
sap.ui.define(['sap/ui/core/Control'], function (Control) {
  'use strict'

  return Control.extend('myui5app.control.BasicList', {
    metadata: {
      properties: {
        editable: { type: 'boolean' },
      },
      aggregations: {
        items: { type: 'sap.ui.core.Control' },
      },
      defaultAggregation: 'items',
    },

    renderer(oRm, oControl) {
      oRm.write('<ul')
      oRm.writeControlData(oControl) // adds UI5 specific attributes to the HTML element
      oRm.write('>')
      oControl.getItems().forEach((item) => {
        oRm.renderControl(item)
      })
      oRm.write('</ul>')
    },
  })
})
```

As already mentioned, this custom control extends the `sap.ui.core.Control` class. We define some metadata, like the control's properties and aggregations (a fancy word for "its children"). These properties and aggregations can be used when consuming the control, for example in an XML view. Probably the most interesting part in the code above is the `renderer()` method, where we essentially use the render manager (`oRm` - opinions about hungarian notation anyone? 😉) to write our HTML. We open an unordered list (`<ul>`), loop over all items (aggregations/children), call their respective renderer, and close the list. The great thing here is that we can combine UI5 internal methods (like `getItems()`) with (more or less) plain HTML - again, we have great flexibility _**on top**_ of the framework.

Let's now continue with the `BasicListItem.js`:

```javascript
sap.ui.define(['sap/ui/core/Control'], function (Control) {
  'use strict'

  return Control.extend('myui5app.control.BasicListItem', {
    metadata: {
      properties: {
        title: { type: 'string' },
        detail1: { type: 'string' },
        detail2: { type: 'string' },
      },
    },

    renderer(oRm, oControl) {
      oRm.write('<li')
      oRm.writeControlData(oControl)
      oRm.write('>')
      if (oControl.getParent().getEditable()) {
        oRm.write('<input')
        oRm.addStyle('width', 'calc(100vw - 100px)')
        oRm.writeStyles()
        oRm.writeAttribute('value', oControl.getTitle())
        oRm.write("'></input>")
      } else {
        oRm.write(oControl.getTitle())
      }
      oRm.write('<ul>')
      oRm.write('<li>')
      oRm.writeEscaped(oControl.getDetail1())
      oRm.write('</li>')
      oRm.write('<li>')
      oRm.writeEscaped(oControl.getDetail2())
      oRm.write('</li>')
      oRm.write('</ul>')
      oRm.write('</li>')
    },

    onchange(e) {
      this.setProperty('title', e.target.value)
    },
  })
})
```

This implementation is arguably a little more complex, but only because we call the `oControl.getParent().getEditable()` method to check whether the outer list is editable or not. If it is editable, we render an input element, if not, we render an simple text. Regarding that, did you notice that we never actually defined a `getEditable()` method? UI5 created that for us automatically when we defined the property `editable` for the `BasicList` - nice! Another nice thing is that we can use the `oRm.addStyle()` method to essentially add CSS to our custom control. We now got all pieces of the puzzle: HTML, CSS, JavaScript.

Let's now use our custom controls in the `MainView.view.xml`:

```xml
<mvc:View
    controllerName="myui5app.controller.MainView"
    xmlns:mvc="sap.ui.core.mvc"
    displayBlock="true"
	xmlns="sap.m"
	xmlns:cc="myui5app.control">
	<VBox>
		<Title text="Flexso Tech Day 2024" />
		<Button text="Edit" press=".edit" />
	</VBox>
	<cc:BasicList id="sessions" items="{/Sessions}" editable="false">
		<cc:BasicListItem title="{title}" detail1="{abstract}" detail2="{speaker}"/>
	</cc:BasicList>
</mvc:View>
```

We make use of the data binding syntax to bind our default OData V4 model to our custom controls. This model was added to our application when we ran the `cap` subgenerator of the easy-ui5 project generator. We will get back to this in just a second. Notice how we import our custom controls by defining a new `cc` namespace pointing to the `control/` directory within our application. Also notice how we combine our custom controls with standard UI5 controls like the `Title` and `Button`. Again, flexibility _**on top**_ of the framework.

This is what the application now looks like:

![screen shot 1](/img/what-makes-a-great-frontend-framework/screen-shot1.png)

To further undermine the tight integration of our custom controls with the rest of our UI5 application, let's add some logic to the `MainView.controller.js` to make the custom list editable:

```javascript
sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
  'use strict'

  return Controller.extend('myui5app.controller.MainView', {
    edit: function () {
      const basicList = this.byId('sessions')
      basicList.setEditable(!basicList.getEditable())
    },
  })
})
```

The `edit` method was previously added to the `press` event of the `Button` in the `MainView.view.xml`. It simply toggles the `editable` property of the `BasicList` control. This is a very simple example, but it shows how easy it is to interact with your custom controls from somewhere else in your application.

Now comes my favorite part. If we press the "Edit" button and edit a title of a session, UI5 will actually submit the change to the backend. It will compose the correspoding OData batch request for us and the backend is automatically updated. This is what the OData V4 model as part of UI5 does for us, on top of custom controls! How great is that?! See the below screen shots for proof:

![screen shot 2](/img/what-makes-a-great-frontend-framework/screen-shot2.png)
![screen shot 3](/img/what-makes-a-great-frontend-framework/screen-shot3.png)

## UI5 2.x

UI5 is currently still in major version 1, despite it being released in 2013. However, this doesn't mean that the framework is outdated. Over 130 minor versions have already been released. If anything, this shows the stability and maturity of the framework, as well as SAP's commitment to backwards compatibility, which is very important in the enterprise context.
The next major version, UI5 2.x, is already in the works and will bring a lot of new features and improvements. One of the most anticipated features (for me) is the native support for web components, which will allow you to use your own web components within the UI5 framework. This will bring even greater flexibility and compatibility to UI5, especially in the context of "custom controls".

To conclude, I don't know of any other frontend framework that offers such great flexibility on top of a being enterprise-ready out-of-the-box and having 1000+ built-in controls (which I barely touched here). This is what I mean when I say "Getting things done, fast. And make them last.".

I am looking forward to hearing your thoughts/input/experiences in the comments below. Happy coding!
