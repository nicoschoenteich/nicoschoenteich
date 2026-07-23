<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
import SectionTitle from '../components/SectionTitle.vue'
import postData from '../blog/posts.json'

interface PostMetadata {
  slug: string
  title: string
  topic: string
  date: string
}

const props = withDefaults(defineProps<{ limit?: number; title?: string }>(), {
  limit: Infinity,
  title: 'Blog',
})

const sortedPosts: PostMetadata[] = [...postData].sort((a, b) => b.date.localeCompare(a.date))
const posts = props.limit === Infinity ? sortedPosts : sortedPosts.slice(0, props.limit)

</script>

<template>
  <main>
    <SectionTitle :title="props.title" />
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
        <div class="meta">
          <span v-if="post.date" class="serif-italic highlight">{{ post.date }}</span>
        </div>
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

.meta {
  display: flex;
  gap: 1rem;
  align-items: baseline;
}

.topic {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--sap-grey6);
}
</style>
