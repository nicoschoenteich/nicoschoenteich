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

const postFiles = fs.readdirSync(DIST_BLOG_DIR).filter(f => f.endsWith(".md"))
const posts = postFiles.map(file => {
	const content = fs.readFileSync(DIST_BLOG_DIR + "/" + file, "utf8")
	const splitContent = content.split("---")
	fs.rmSync(DIST_BLOG_DIR + "/" + file)

	const markdown = splitContent[2]
	const html = converter.makeHtml(markdown)
	fs.writeFileSync(DIST_BLOG_DIR + "/" + file.slice(0, -3) + ".html", html)

	const frontmatter = splitContent[1]
	return yaml.parse(frontmatter)
})
fs.writeFileSync(DIST_BLOG_DIR + "/posts.json", JSON.stringify(posts))

const rootHtml = fs.readFileSync(DIST_DIR + "/routing/rootView.html", "utf8")
for (const route of routes) {
	const indexHtml = fs.readFileSync(DIST_DIR + route + "/index.html", "utf8")
	fs.writeFileSync(DIST_DIR + route + "/index.html", rootHtml.replace("<slot />", indexHtml))
}
fs.rmSync(DIST_DIR + "/routing", { recursive: true, force: true })
