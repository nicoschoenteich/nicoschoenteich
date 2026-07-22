<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
import SectionTitle from '../components/SectionTitle.vue'

interface PostMetadata {
  slug: string
  title: string
  date: string
}

const props = withDefaults(defineProps<{ limit?: number; title?: string }>(), {
  limit: Infinity,
  title: 'Blog',
})

const postModules = import.meta.glob('../blog/*.md', {
  eager: false,
  query: '?raw',
  import: 'default',
})

const posts = ref<PostMetadata[]>([])

onMounted(async () => {
  const loaded: PostMetadata[] = []
  for (const [path, loader] of Object.entries(postModules)) {
    const filename = path.replace('../blog/', '').replace('.md', '')
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/)
    const date = dateMatch?.[1] ?? ''
    const slug = filename
    const raw = await (loader as () => Promise<string>)()
    const firstLine = raw.split('\n').find((l) => l.startsWith('# ')) ?? ''
    const title = firstLine.replace(/^#\s+/, '') || slug
    loaded.push({ slug, title, date })
  }
  loaded.sort((a, b) => b.date.localeCompare(a.date))
  posts.value = loaded.slice(0, props.limit)
})
</script>

<template>
  <main>
    <SectionTitle :title="props.title" />
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
        <span v-if="post.date" class="serif-italic highlight">{{ post.date }}</span>
      </li>
    </ul>

    <nav v-if="props.limit !== Infinity">
      <RouterLink to="/blog">
        <Button text="Go to Blog" />
      </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0 0 2rem 0;
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 1rem;

  border-top: 1px solid var(--sap-blue10);
}
</style>
