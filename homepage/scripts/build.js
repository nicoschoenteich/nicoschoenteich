import fs from "fs"
import yaml from "yaml"
import showdown from "showdown"
import routes from "../app/routing/routes.json" with { type: "json" }

const APP_DIR = "./app"
const DIST_DIR = "./dist"
const DIST_BLOG_DIR = DIST_DIR + "/blog"
const converter = new showdown.Converter()

fs.rmSync(DIST_DIR, { recursive: true, force: true })
fs.cpSync(APP_DIR, DIST_DIR, { recursive: true })

const rootHtml = fs.readFileSync(DIST_DIR + "/routing/root.html", "utf8")
for (const route of routes) {
	const slotHtml = fs.readFileSync(DIST_DIR + route.path + "/index.html", "utf8")
	fs.writeFileSync(
		DIST_DIR + route.path + "/index.html",
		rootHtml
			.replace("{{{ slot }}}", slotHtml)
			.replace("{{{ meta tags }}}", "")
			.replace("{{{ title }}}", route.title))
}
fs.rmSync(DIST_DIR + "/routing", { recursive: true, force: true })

const files = fs.readdirSync(DIST_BLOG_DIR).filter(f => f.endsWith(".md"))
const posts = files
	.sort((a, b) => new Date(b.date) - new Date(a.date))
	.map(file => {
	const slug = file.slice(0, -3)
	const content = fs.readFileSync(DIST_BLOG_DIR + "/" + file, "utf8")
	const splitContent = content.split("---")
	fs.rmSync(DIST_BLOG_DIR + "/" + file)

	const frontmatter = splitContent[1]
	const metadata = yaml.parse(frontmatter)
	metadata.slug = slug

	const postMarkdown = splitContent[2]
	const postHtml = converter.makeHtml(postMarkdown)
	const enhancedPostHtml = `
		<script src="/components/button.js"></script>
		<article>
			<div class="header-wrapper">
      	<div class="header-left">
        	<nav>
          	<nicoschoenteich-button img="/img/back.svg" onClick="(function(){history.back()})();"></nicoschoenteich-button>
        	</nav>
        	<span class="serif-italic highlight">${metadata.date}</span>
      	</div>
				<img class="topic" src="/img/${metadata.topic}.svg" />
    	</div>
			${postHtml}
		</article>`
	const postMetaTags = `
	  <meta property="og:title" content="${metadata.title}" />
 	 	<meta property="og:url" content="https://nicoschoenteich.de/blog/${metadata.slug}" />
 	 	<meta property="og:type" content="article" />
		<link rel="canonical" href="https://nicoschoenteich.de/blog/${metadata.slug}" />
	`
	fs.writeFileSync(
		DIST_BLOG_DIR + "/" + slug + ".html",
		rootHtml
			.replace("{{{ slot }}}", enhancedPostHtml)
			.replace("{{{ meta tags }}}", postMetaTags)
			.replace("{{{ title }}}", "Nico Schoenteich - " + metadata.title))

	return metadata
})
fs.writeFileSync(DIST_BLOG_DIR + "/posts.json", JSON.stringify(posts.reverse()))

const rssItems = posts
		.map(post => `
	<item>
		<title>${post.title}</title>
		<link>https://nicoschoenteich.de/blog/${post.slug}</link>
		<guid>https://nicoschoenteich.de/blog/${post.slug}</guid>
		<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		<description>${post.description ?? post.title}</description>
	</item>`).join("")

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Nico Schoenteich - Blog</title>
		<link>https://nicoschoenteich.de</link>
		<description>I am a Developer Advocate at SAP, where I help developers achieve their goals with SAP and non-SAP technology.</description>
		<language>en-US</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="https://nicoschoenteich.de/blog/feed.xml" rel="self" type="application/rss+xml" />
		${rssItems}
	</channel>
</rss>`

fs.writeFileSync(DIST_BLOG_DIR + "/feed.xml", rss)
