class NicoschoenteichFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="icons">
				<a href="https://www.linkedin.com/in/nico-schoenteich/" target="_blank" aria-label="LinkedIn">
					<img src="/img/linkedin.png" alt="LinkedIn" />
				</a>
				<a href="https://github.com/nicoschoenteich" target="_blank" aria-label="GitHub">
					<img src="/img/github.svg" alt="GitHub" />
				</a>
				<a href="mailto:nicolai.schoenteich@sap.com" aria-label="Email">
					<img src="/img/email.svg" alt="Email" />
				</a>
			</div>
			<div>
				<span class="serif-italic highlight">nicolai.schoenteich@sap.com</span>
			</div>

      <style>
        nicoschoenteich-footer {
          display: flex;
					flex-direction: column;
					align-items: center;
					gap: 2rem;
					padding-top: 2.1rem;
					padding-bottom: 1rem;
          border-top: 1px solid var(--sap-blue10);
					margin-top: 5rem;
        }
				nicoschoenteich-footer .icons {
					display: flex;
					gap: 1.5rem;
				}
				nicoschoenteich-footer a {
					text-decoration: none;
				}
				nicoschoenteich-footer img {
					height: 4rem;
				}
				@media (max-width: 600px) {
					nicoschoenteich-footer img {
						height: 2.5rem;
					}
				}
      </style>
    `;
	}
}

customElements.define('nicoschoenteich-footer', NicoschoenteichFooter);
