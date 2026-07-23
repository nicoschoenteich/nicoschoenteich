import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dirname, '../src/blog')
const outputFile = join(blogDir, 'posts.json')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  return Object.fromEntries(
    match[1].split('\n')
      .map(line => line.match(/^(\w+):\s*"?([^"]*)"?$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value])
  )
}

const posts = readdirSync(blogDir)
  .filter(f => f.endsWith('.md'))
  .map(file => {
    const content = readFileSync(join(blogDir, file), 'utf-8')
    const { title, topic, date } = parseFrontmatter(content)
    const slug = file.replace('.md', '')
    return { slug, title: title ?? slug, topic: topic ?? '', date: date ?? '' }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

writeFileSync(outputFile, JSON.stringify(posts, null, 2) + '\n')
console.log(`generated posts.json (${posts.length} posts)`)
