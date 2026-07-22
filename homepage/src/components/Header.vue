<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const fullText = 'Schoenteich'
const displayedText = ref('')
const showCursor = ref(true)

onMounted(() => {
  let i = 0
  const typeNext = () => {
    displayedText.value += fullText[i]
    i++
    if (i === fullText.length) {
      setInterval(() => {
        showCursor.value = !showCursor.value
      }, 500)
    } else {
      setTimeout(typeNext, Math.random() * 400 + 50)
    }
  }
  setTimeout(typeNext, Math.random() * 400 + 50)
})
</script>

<template>
  <div class="header">
    <RouterLink to="/">
      <h1>
        <span class="serif-italic">Nico </span>
        <span class="bold">{{ displayedText }}<span class="cursor" :class="{ visible: showCursor }"></span></span>
      </h1>
    </RouterLink>
    <nav class="serif-italic">
      <RouterLink to="/">[Home]</RouterLink>
      <RouterLink to="/blog">[Blog]</RouterLink>
      <!-- <RouterLink to="/feed">[Feed]</RouterLink> -->
    </nav>
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

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  font-size: 1.1rem;
  text-decoration: none;
  color: inherit;
}

nav a:hover {
  background: linear-gradient(to top, var(--sap-indigo2) 0.55rem, transparent 0.45rem);
  align-self: flex-start;

}

nav a.router-link-active {
	  font-weight: bold;


}

.cursor {
  display: inline-block;
  width: 0.5rem;
  height: 1em;
  background-color: currentColor;
  vertical-align: middle;
  margin-left: 0.5rem;
	margin-top: -0.5rem;
  opacity: 0;
  transition: opacity 0.1s;
}

.cursor.visible {
  opacity: 1;
}
</style>
