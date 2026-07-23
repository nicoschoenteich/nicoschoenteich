class NicoschoenteichSplitLayout extends HTMLElement {
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' })
		shadow.innerHTML = `
      <div class="split-left">
        <slot name="left"></slot>
      </div>
      <div class="split-right">
        <slot name="right"></slot>
      </div>

      <style>
        :host {
          display: flex;
          width: 100%;
          gap: 5rem;
          margin-bottom: 5rem;
        }

        .split-left, .split-right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

				@media (max-width: 850px) {
					:host {
						flex-direction: column-reverse;
						align-items: center;
					}
					.split-left, .split-right {
						width: 100%;
        	}
        	.split-left.empty,
          .split-right.empty {
            display: none;
          }
				}
				@media (max-width: 600px) {
					:host {
						gap: 3rem;
          	margin-bottom: 3rem;
					}
				}
      </style>
    `;
		const leftSlot = shadow.querySelector('slot[name="left"]')
		const rightSlot = shadow.querySelector('slot[name="right"]')

		const updateVisibility = () => {
			shadow.querySelector('.split-left').classList.toggle('empty', !leftSlot.assignedNodes().length)
			shadow.querySelector('.split-right').classList.toggle('empty', !rightSlot.assignedNodes().length)
		}

		leftSlot.addEventListener('slotchange', updateVisibility)
		rightSlot.addEventListener('slotchange', updateVisibility)
		updateVisibility()
	}
}

customElements.define('nicoschoenteich-split-layout', NicoschoenteichSplitLayout);
