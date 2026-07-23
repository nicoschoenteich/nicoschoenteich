<script setup lang="ts">
withDefaults(defineProps<{ title: string; showStar?: boolean }>(), {
  showStar: true,
})
</script>

<template>
  <div class="section-title">
    <h2 class="serif-italic">[{{ title }}]</h2>
    <img v-if="showStar" src="/img/app/star-small.svg" alt="" />
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
}

h2 {
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0 0 1rem 0;
}

img {
  height: 2rem;
  margin-top: -1rem;
  margin-left: 0.5rem;
}
</style>
