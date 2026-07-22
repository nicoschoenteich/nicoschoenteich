<script setup lang="ts">
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

const titleModules = import.meta.glob('../blog/*.md', {
  eager: true,
  import: 'title',
})

const allPosts: PostMetadata[] = Object.entries(titleModules)
  .map(([path, title]) => {
    const slug = path.replace('../blog/', '').replace('.md', '')
    const date = slug.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? ''
    return { slug, title: (title as string) || slug, date }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

const posts = props.limit === Infinity ? allPosts : allPosts.slice(0, props.limit)
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

a {
  color: var(--sap-blue10);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
