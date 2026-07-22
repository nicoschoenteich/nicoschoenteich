<script setup lang="ts">
defineProps<{ text: string; img?: string }>()
</script>

<template>
  <button>
    <img v-if="img" :src="img" :alt="text" />
    {{ text }}
  </button>
</template>

<style scoped>
button {
  font-size: 0.875rem;
  height: 1.625rem;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.374rem;

  color: white;
  background-color: var(--sap-indigo6);
  border: 0.0625rem solid var(--sap-indigo6);
}

button img {
  height: 0.8rem;
}

button:hover {
  cursor: pointer;
  background-color: var(--sap-indigo7);
  border: 0.0625rem solid var(--sap-indigo7);
}
</style>

<style>
a:has(button) {
  text-decoration: none;
}
</style>
