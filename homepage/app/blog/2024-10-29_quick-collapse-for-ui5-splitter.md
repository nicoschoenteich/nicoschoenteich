---
title: "Implementing a quick collapse for the UI5 Splitter control"
topic: "ui5"
date: "2024-10-29"
---

# Implementing a quick collapse for the UI5 Splitter control

Recently a question came up in an internal channel about how to implement a quick collapse feature for the UI5 Splitter control. Actually, the question was about the ResponsiveSplitter, which already has a quick collapse feature when double clicking on the splitbar, but it would only collapse the first (left) content area. The question was how can we collapse the second (right) content area, or any other content area for that matter, if the user clicks on the splitbar? I built a small custom control that does that, and instead of keeping it internal, I thought I would share it with the community, so hopefully more people can benefit from it.

Let's start with the custom control itself:

```javascript
sap.ui.define(['sap/ui/layout/Splitter'], function (SuperControl) {
  'use strict'

  return SuperControl.extend('myui5app.control.CustomSplitter', {
    metadata: {
      properties: {
        quickCollapseIndex: { type: 'string', defaultValue: '' },
      },
      aggregations: {},
    },

    renderer: {},

    onAfterRendering: function () {
      if (sap.ui.layout.Splitter.prototype.onAfterRendering) {
        sap.ui.layout.Splitter.prototype.onAfterRendering.apply(this, arguments) //run the super class's method first
      }

      const splitter = this.getDomRef()
      splitter.addEventListener('dblclick', (e) => {
        if (e.target.id === splitter.id) {
          const allContentAreas = this.getContentAreas()
          if (this.getQuickCollapseIndex()) {
            const contentAreaToCollapse = allContentAreas[this.getQuickCollapseIndex()]
            contentAreaToCollapse.getLayoutData().setSize('0px')
          }
        }
      })
    },
  })
})
```

This custom control extends the `sap.ui.layout.Splitter`, which the `sap.ui.layout.ResponsiveSplitter` (which the original question referred to) also extends. It attaches a new dblclick event listener to it. The event listener method first checks that it's actually the splitbar that was actually being clicked on (not one of the content areas). It then gets its newly created `quickCollapseIndex` attribute (which we will have to define when using the custom control), finds the corresponding content area among all of them, and eventually sets its size to `0px` (via the layout data).

We can now use this custom control in an XML view:

```xml
<mvc:View
	controllerName="myui5app.controller.MainView"
	xmlns:mvc="sap.ui.core.mvc"
	displayBlock="true"
	xmlns="sap.m"
	xmlns:cc="myui5app.control"
	xmlns:l="sap.ui.layout">
    <Page id="page" title="{i18n>title}">
		<cc:CustomSplitter quickCollapseIndex="1">
			<HBox>
				<Title text="My first content area" />
			</HBox>
			<HBox>
				<layoutData>
					<l:SplitterLayoutData size="50%" />
				</layoutData>
				<Title text="My second content area" />
			</HBox>
		</cc:CustomSplitter>
    </Page>
</mvc:View>
```

When using the custom control, we set the `quickCollapseIndex` attribute to `1`, which basically means it should collapse the second content area (zero-based index). This works with any other content area as well. Perhaps the only drawback with this custom control is that we do have to set an initial size for the content area we want to collapse, otherwise it won't work. I am not really sure why, but it is what it is.

This is the `CustomSplitter` in action:

![CustomSplitter](/img/quick-collapse-for-ui5-splitter/quick-collapse-for-splitter.gif)

Thanks for reading!
