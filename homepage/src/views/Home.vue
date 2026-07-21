<script setup lang="ts">
	import About from '../components/About.vue'
import Blog from './Blog.vue'
import Contact from '../components/Contact.vue'

</script>

<template>
  <About />
  <Blog :limit="5" title="Most recent blog posts" />
  <nav><RouterLink to="/blog">Go to blog →</RouterLink></nav>
	<Contact />
</template>
