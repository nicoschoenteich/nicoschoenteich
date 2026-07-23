class NicoschoenteichSectionTitle extends HTMLElement {
	connectedCallback() {
		const title = this.getAttribute('title') ?? ''
		const showStar = this.getAttribute('show-star') !== 'false'

		this.innerHTML = `
      <div class="section-title">
        <h2 class="serif-italic">[${title}]</h2>
        ${showStar ? `<img src="/img/star-small.svg" alt="" />` : ''}
      </div>

      <style>
        nicoschoenteich-section-title .section-title {
          display: flex;
        }

        nicoschoenteich-section-title h2.serif-italic {
          font-size: 1.5rem;
          font-weight: normal;
          margin: 0 0 1rem 0;
        }

        nicoschoenteich-section-title img {
          height: 2rem;
          margin-top: -1rem;
          margin-left: 0.5rem;
        }
      </style>
    `;
	}
}

customElements.define('nicoschoenteich-section-title', NicoschoenteichSectionTitle);
