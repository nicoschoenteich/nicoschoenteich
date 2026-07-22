<script setup lang="ts">
import HorizontalLine from '../components/HorizontalLine.vue'
import SectionTitle from '../components/SectionTitle.vue'
</script>

<template>
  <SectionTitle title="Contact" />
  <HorizontalLine />
  <div class="contact-icons">
    <a href="https://www.linkedin.com/in/nico-schoenteich/" target="_blank" aria-label="LinkedIn">
      <img src="/img/app/linkedin.png" alt="LinkedIn" />
    </a>
    <a href="https://github.com/nicoschoenteich" target="_blank" aria-label="GitHub">
      <img src="/img/app/github.svg" alt="GitHub" />
    </a>
    <a href="mailto:nicolai.schoenteich@sap.com" aria-label="Email">
      <img src="/img/app/email.svg" alt="Email" />
    </a>
  </div>
</template>

<style scoped>
.contact-icons {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
}

.contact-icons img {
  height: 4rem;
  width: auto;
}
</style>
