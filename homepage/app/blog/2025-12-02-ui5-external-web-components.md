---
topic: "ui5"
description: "This post summarizes my learnings on how to consume arbitrary web components natively in UI5 applications."
---

# Consuming your own (or external) Web Components in UI5 Applications

_This post summarizes my learnings on how to consume arbitrary [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) natively in UI5 applications. This is a powerful alternative to UI5 custom controls, since web components are framework-agnostic and can be reused in other contexts as well._

A lot of people perceive UI5 as a control library only, or at least a frontend framework that is very closely tied to its control library, but it's actually much more than that. It's a very powerful and flexible framework that can be extended and used in many different ways.

During the Developer Keynote at SAP TechEd on Tour Bangalore 2025 (no online recording unfortunately), I demoed the flexibility and openness of UI5 by showing two approaches for extending UI5 application with custom elements:

The first approach has been around for quite a while and is well known: developing UI5 custom controls. With this approach, you essentially create new UI5 controls by extending existing UI5 controls. This approach has the advantage of being fully integrated into the UI5 framework, but it also means it is tightly coupled to UI5. You cannot reuse UI5 custom controls for applications that are not based on UI5. However, since third-party packages (e.g. from npm) can be consumend inside UI5 applications as well (see [ui5-tooling-modules](https://www.npmjs.com/package/ui5-tooling-modules)), this approach is by no means limited. Check out this repository for detailed instructions on how to build a UI5 custom control that renders a 3D model of a supermarket to guide customers to a product's location: [ui5-advanced-exercises-codejam](https://github.com/SAP-samples/ui5-advanced-exercises-codejam)

The second approach is very new to UI5: building your own web components and consuming them natively in UI5 applications. This approach is framework-agnostic, as the technologies that make up web components are open web standards. This means you can (re)use the same web components in any web application, regardless of the framework. Think of whole design systems that could be built using this approach, and then be reused in UI5/React/Angular/Vue applications alike! This blog post focuses on this second approach.

To demonstrate this capability, we first need a web component. For the sake of simplicity, I created a very basic web component that displays a button, and when clicked, shows an alert. The code for the web component looks like this:

```javascript
class CustomAlertButton extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'message']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render()
  }

  constructor() {
    super()

    /**
     * Sets the button's text.
     * @default "Show Alert"
     * @public
     */
    this.text = 'Show Alert'

    /**
     * Sets the alert message.
     * @default ""
     * @public
     */
    this.message = ''

    this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    const text = this.getAttribute('text') || this.text
    const message = this.getAttribute('message') || this.message
    let button
    if (!this.shadowRoot.querySelector('button')) {
      button = document.createElement('button')
      this.shadowRoot.appendChild(button)
    } else {
      button = this.shadowRoot.querySelector('button')
      button.textContent = text
      if (message) {
        button.addEventListener('click', async () => {
          alert(message)
        })
      }
    }
  }
}

customElements.define('custom-alert-button', CustomAlertButton)
```

There are two things important to note regarding the implementation above:

1. For some reason I don't fully understand yet, the `render` method of the web component will get executed three times when the component is first rendered in a UI5 application. Therefore, the method includes some conditional logic to avoid adding multiple buttons or event handlers to the shadow DOM.
1. The static getter `observedAttributes` as well as the [JSDoc](https://jsdoc.app/) comments in the `constructor` method are **mandatory** in order for UI5 to be able to recognize the web component correctly and integrate it into its data binding and property system. Furthermore, we have to generate a `custom-elements.js` manifest file that describes the web component's API. This can be done using the [@custom-elements-manifest/analyzer](https://www.npmjs.com/package/@custom-elements-manifest/analyzer) package. After installing it as a dev dependency, you can run the following command to generate the manifest file:

```bash
custom-elements-manifest analyze
```

This will create a `custom-elements.json` file in the root of your project. The file tree of your custom web component package should now look like this:

```text
custom-webc-package/
|-- custom-elements.js
|-- CustomAlertButton.js
|-- package.json
```

With the custom web component package ready, we can now consume it in a UI5 application. To do so, we first need to install it as a dependency. In the `package.json` of the UI5 application, add it as a dependency and run `npm install` afterwards:

```json
...
{
  "dependencies": {
    "custom-webc-package": "file:<path-to-your-custom-webc-package>"
  }
}
...
```

At this point you might be thinking "wait, I can just declare any package as a dependency and use it in UI5?!" - and the answer is yes, with the help of the [ui5-tooling-modules](https://www.npmjs.com/package/ui5-tooling-modules) package, which allows you to consume arbitrary npm packages in UI5 applications. So make sure you have it set up in your UI5 application.

Now that the custom web component package is installed, its consumption is very straightforward. Simply declare a namespace in an XML view that points to the package, and use the web component like any other UI5 control:

```xml
<mvc:View
    ...
	xmlns:webc="custom-webc-package">
    ...
    <webc:custom-alert-button
        text="Click Me!"
        message="Hello from my custom web component!" />
    ...
```

![custom web component in UI5 app](/img/ui5-external-web-components/custom-webc-in-ui5.png)

Now, to top off this exmaple, one more thing worth mentioning: In our web component implementation, we can even import and use other web components, for example [UI5 web components](https://ui5.github.io/webcomponents/). The UI5 web components have the same look and feel as the standard UI5 controls, but they are built on top of web component technologies, so they too are framework-agnostic (just like our own custom web component). In our example, we can replace the standard HTML button with the `ui5-button` web component from the UI5 web components library:

```javascript
import "@ui5/webcomponents/dist/Button.js"

class CustomAlertButton extends HTMLElement {

    ...

    render() {
		const text = this.getAttribute("text") || this.text
		const message = this.getAttribute("message") || this.message
		let button
		if (!this.shadowRoot.querySelector("ui5-button")) {
			button = document.createElement("ui5-button")
			this.shadowRoot.appendChild(button)
		} else {
			button = this.shadowRoot.querySelector("ui5-button")
			button.textContent = text
			if (message) {
				button.addEventListener("click", async () => {
					alert(message)
				})
			}
		}
	}
}

customElements.define("custom-alert-button", CustomAlertButton)
```

![custom web component with ui5 button](/img/ui5-external-web-components/custom-webc-with-ui5-button.png)

We have now come full-circle: We created a custom web component, which by design is framework-agnostic, and used a UI5 web component inside of it. We consumed the custom web component in a UI5 application, demonstrating the flexibility and openness of the UI5 framework, and we could take this same web component to any other application as well, be it UI5 or not.

Try it out yourself and let me know how it goes!
