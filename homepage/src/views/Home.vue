<script setup lang="ts">
import About from '../components/About.vue'
import Blog from './Blog.vue'
import Contact from '../components/Contact.vue'
import Hero from '../components/Hero.vue'
import SectionTitle from '../components/SectionTitle.vue'
import SplitLayout from '../components/SplitLayout.vue'
</script>

<template>
  <SplitLayout>
    <template #left>
      <!-- <SectionTitle title="About" :showStar="false" /> -->
    </template>
    <template #right>
      <About />
    </template>
  </SplitLayout>

  <SplitLayout>
    <template #left>
      <Blog :limit="5" title="Most recent blog posts" />
    </template>
    <template #right>
      <Hero />
    </template>
  </SplitLayout>

</template>
