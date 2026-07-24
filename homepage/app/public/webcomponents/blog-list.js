class NicoschoenteichBlogList extends HTMLElement {
	async connectedCallback() {
		const limit = this.hasAttribute('limit') ? parseInt(this.getAttribute('limit')) : Infinity

		const response = await fetch('/blog/feed.json')
		const posts = await response.json()
		const visible = limit === Infinity ? posts : posts.slice(0, limit)

		this.innerHTML = `
			<ul>
        ${visible.map(post => `
          <li>
            <a href="/blog/${post.slug}">
              <span>${post.title}</span>
              ${post.date ? `<span class="serif-italic highlight">${post.date}</span>` : ''}
            </a>
          </li>
        `).join('')}
      </ul>

      <style>
        nicoschoenteich-blog-list ul {
          list-style: none;
          margin: 0;
          padding: 0;
					width: 100%;
        }

        nicoschoenteich-blog-list li {
          padding-top: 1rem;
          padding-bottom: 1rem;
          border-top: 1px solid var(--sap-blue10);
        }

        nicoschoenteich-blog-list a {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          color: var(--sap-blue10);
          text-decoration: none;
        }

        nicoschoenteich-blog-list a:hover {
          text-decoration: underline;
        }

        nicoschoenteich-blog-list .meta {
          display: flex;
          gap: 1rem;
          align-items: baseline;
        }
      </style>
    `;
	}
}

customElements.define('nicoschoenteich-blog-list', NicoschoenteichBlogList);
