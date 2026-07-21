<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface PostMetadata {
  slug: string
  title: string
  date: string
}

const props = withDefaults(defineProps<{ limit?: number; title?: string }>(), {
  limit: Infinity,
  title: 'Blog',
})

const postModules = import.meta.glob('../blog/*.md', { eager: false, query: '?raw', import: 'default' })

const posts = ref<PostMetadata[]>([])

onMounted(async () => {
  const loaded: PostMetadata[] = []
  for (const [path, loader] of Object.entries(postModules)) {
    const filename = path.replace('../blog/', '').replace('.md', '')
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)
    const date = dateMatch?.[1] ?? ''
    const slug = filename
    const raw = await (loader as () => Promise<string>)()
    const firstLine = raw.split('\n').find(l => l.startsWith('# ')) ?? ''
    const title = firstLine.replace(/^#\s+/, '') || slug
    loaded.push({ slug, title, date })
  }
  loaded.sort((a, b) => b.date.localeCompare(a.date))
  posts.value = loaded.slice(0, props.limit)
})
</script>

<template>
  <main>
    <h2>{{ props.title }}</h2>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
        <span v-if="post.date" class="date">{{ post.date }}</span>
      </li>
    </ul>
  </main>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.date {
  color: #888;
  font-size: 0.9rem;
}
</style>
