import fs from "fs"
import routes from "../app/routing/routes.json" with { type: "json" }
import showdown from "showdown"
import yaml from "yaml"

export default class StaticSiteGenerator {
	constructor() {
		fs.rmSync("./dist", { recursive: true, force: true })
		fs.cpSync("./app", "./dist", { recursive: true })

		this.rootHtml = fs.readFileSync("./dist/routing/root.html", "utf8")
		this.mdFiles = fs.readdirSync("./dist/blog").filter(f => f.endsWith(".md"))

		this.generateStaticSitesFromRootHtml()
		this.generateStaticSitesFromMarkdown()
		this.generateFeedJson()
		this.generateFeedXml()
		this.cleanUpDistDir()
	}

	generateStaticSitesFromRootHtml() {
		for (const route of routes) {
			const slotHtml = fs.readFileSync("./dist" + route.path + "/index.html", "utf8")
			fs.writeFileSync(
				"./dist" + route.path + "/index.html",
				this.rootHtml
					.replace("{{{ slot }}}", slotHtml)
					.replace("{{{ meta tags }}}", "")
					.replace("{{{ title }}}", route.title))
		}
	}

	generateStaticSitesFromMarkdown() {
		const converter = new showdown.Converter()
		for (const file of this.mdFiles) {
			const { metadata, markdown } = this.extractInfoFromMarkdownFile(file)
			const postHtml = converter.makeHtml(markdown)
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
				"./dist/blog/" + metadata.slug + ".html",
				this.rootHtml
					.replace("{{{ slot }}}", enhancedPostHtml)
					.replace("{{{ meta tags }}}", postMetaTags)
					.replace("{{{ title }}}", "Nico Schoenteich - " + metadata.title))
		}
	}

	generateFeedJson() {
		this.posts = this.mdFiles.map(file => {
			const { metadata } = this.extractInfoFromMarkdownFile(file)
			return metadata
		})
		fs.writeFileSync("./dist/blog/feed.json", JSON.stringify(this.posts.reverse()))
	}

	generateFeedXml() {
		const rssItems = this.posts
			.map(post => `
				<item>
					<title>${post.title}</title>
					<link>https://nicoschoenteich.de/blog/${post.slug}</link>
					<guid>https://nicoschoenteich.de/blog/${post.slug}</guid>
					<pubDate>${new Date(post.date).toUTCString()}</pubDate>
					<description>${post.description}</description>
				</item>
			`).join("")

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

		fs.writeFileSync("./dist/blog/feed.xml", rss)
	}

	cleanUpDistDir() {
		for (const file of this.mdFiles) {
			fs.rmSync("./dist/blog/" + file)
		}
		fs.rmSync("./dist/routing", { recursive: true, force: true })
	}
	

	extractInfoFromMarkdownFile(file) {
		const content = fs.readFileSync("./dist/blog/" + file, "utf8")

		const splitContent = content.split("---")
		const frontmatter = splitContent[1]
		const metadata = yaml.parse(frontmatter)
		metadata.title = splitContent[2].split("# ")[1].split("\n")[0]
		metadata.date = file.slice(0, 10)
		metadata.slug = file.slice(0, -3)
		return { metadata, markdown: splitContent[2] }
	}

}
