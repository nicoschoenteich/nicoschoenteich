<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="header">
    <RouterLink to="/">
      <h1>
        <span class="serif-italic">Nico </span>
        <span class="bold">Schoenteich</span>
      </h1>
    </RouterLink>
    <div class="icons">
      <img src="/img/app/ui5.svg" />
      <img src="/img/app/cap.svg" />
      <img src="/img/app/anvil.svg" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid var(--sap-blue10);
  border-bottom: 1px solid var(--sap-blue10);

  margin-bottom: 5rem;
}

a {
  text-decoration: none;
  color: inherit;
}

h1,
h1 .serif-italic {
  font-size: 5rem;
  font-weight: unset;
  letter-spacing: -3%;
  margin-top: 0;
  margin-bottom: 0;
}

.icons {
  display: flex;
  gap: 1rem;
}

.icons img {
  height: 4rem;
}
</style>
