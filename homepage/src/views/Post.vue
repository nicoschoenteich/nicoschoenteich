<script setup lang="ts">
import Button from '../components/Button.vue'
import { defineAsyncComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)
const topic = computed(() => slug.value.split('_')[1] ?? '')
const date = computed(() => slug.value.split('_')[0] ?? '')

const PostComponent = computed(() => defineAsyncComponent(() => import(`../blog/${slug.value}.md`)))
</script>

<template>
  <main>
    <div class="pre-article-header-wrapper">
      <div class="pre-article-header-left">
        <nav>
          <Button img="/img/app/back.svg" @click="router.back()" />
        </nav>
        <span class="serif-italic highlight">{{ date }}</span>
      </div>
      <img v-if="topic" class="topic-image" :src="`/img/app/${topic}.svg`" />
    </div>

    <article>
      <component :is="PostComponent" />
    </article>
  </main>
</template>

<style scoped>
.pre-article-header-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.pre-article-header-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

article {
  position: relative;
  max-width: 720px;
	margin-bottom: 8rem;
}
.topic-image {
  height: 10rem;
}
</style>
