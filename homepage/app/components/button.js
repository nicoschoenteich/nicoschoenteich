class NicoschoenteichButton extends HTMLElement {
	connectedCallback() {
		const text = this.getAttribute('text') ?? '';
		const img = this.getAttribute('img');

		this.innerHTML = `
		  <button>
        ${img ? `<img src="${img}" alt="${text}" />` : ''}
        ${text}
      </button>

      <style>
        nicoschoenteich-button button {
          font-size: 1rem;
					font-weight: bold;
          border-radius: 0.5rem;
					padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          background-color: var(--sap-indigo6);
          border: 0.0625rem solid var(--sap-indigo6);
        }

        nicoschoenteich-button button img {
          height: 1rem;
        }

        nicoschoenteich-button button:hover {
          cursor: pointer;
          background-color: var(--sap-indigo7);
          border: 0.0625rem solid var(--sap-indigo7);
        }

        a:has(nicoschoenteich-button) {
          text-decoration: none;
        }
      </style>
    `;
	}
}

customElements.define('nicoschoenteich-button', NicoschoenteichButton);
