<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const PostComponent = computed(() => defineAsyncComponent(() => import(`../blog/${slug.value}.md`)))
</script>

<template>
  <main>
    <nav><RouterLink to="/">← Back</RouterLink></nav>
    <article>
      <component :is="PostComponent" />
    </article>
  </main>
</template>

<style scoped>
nav {
  margin-bottom: 1.5rem;
}
article {
  max-width: 720px;
}
</style>
