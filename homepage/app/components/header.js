class NicoschoenteichHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="header">
				<a href="/">
					<h1>
						<span class="serif-italic">Nico </span>
						<span class="bold"><span class="typed">S</span><span class="cursor visible"></span></span>
					</h1>
				</a>
				<nav class="serif-italic">
					<a href="/">[Home]</a>
					<a href="/blog">[Blog]</a>
				</nav>
			</div>

			<style>
				nicoschoenteich-header .header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid var(--sap-blue10);
					border-bottom: 1px solid var(--sap-blue10);
					margin-bottom: 5rem;
				}
				nicoschoenteich-header a {
					text-decoration: none;
					color: inherit;
				}
				nicoschoenteich-header h1,
				nicoschoenteich-header h1 .serif-italic {
					font-size: 5rem;
					font-weight: unset;
					letter-spacing: -3%;
					margin-top: 0;
					margin-bottom: 0;
				}
				nicoschoenteich-header .cursor {
					display: inline-block;
					width: 0.5rem;
					height: 1em;
					background-color: currentColor;
					vertical-align: middle;
					margin-left: 0.5rem;
					margin-top: -0.5rem;
					opacity: 0;
					transition: opacity 0.1s;
				}
				nicoschoenteich-header .cursor.visible {
					opacity: 1;
				}
				nicoschoenteich-header nav {
					display: flex;
					gap: 1.5rem;
				}
				nicoschoenteich-header nav a {
					font-size: 1.1rem;
				}
				nicoschoenteich-header nav a:hover {
					background: linear-gradient(to top, var(--sap-indigo2) 0.55rem, transparent 0.45rem);
					align-self: flex-start;
				}
				nicoschoenteich-header nav a.active {
					font-weight: bold;
				}
				@media (max-width: 850px) {
					nicoschoenteich-header .header {
						margin-bottom: 3rem;
					}
					nicoschoenteich-header h1,
					nicoschoenteich-header h1 .serif-italic {
						font-size: 3rem;
					}
				}
				@media (max-width: 600px) {
					nicoschoenteich-header .header {
						margin-top: 3rem;
					}
					nicoschoenteich-header nav {
						position: absolute;
						top: 1rem;
						right: 1rem;
					}
				}
			</style>
		`;

		const typed = this.querySelector('.typed')
		const cursor = this.querySelector('.cursor')

		const fullText = 'Schoenteich'
		let displayedText = 'S'
		let showCursor = true

		const type = () => {
			displayedText += fullText[displayedText.length]
			typed.textContent = displayedText
			if (displayedText.length === fullText.length) {
				setInterval(() => {
					showCursor = !showCursor
					cursor.classList.toggle('visible', showCursor)
				}, 500)
			} else {
				setTimeout(type, Math.random() * 400 + 50)
			}
		}
		setTimeout(type, Math.random() * 400 + 50)

		this.querySelectorAll('nav a').forEach(link => {
			if (link.getAttribute('href') === window.location.pathname) {
				link.classList.add('active')
			}
		})

	}
}

customElements.define('nicoschoenteich-header', NicoschoenteichHeader);
