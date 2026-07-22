<template>
  <div class="split">
    <div class="split-left">
      <slot name="left" />
    </div>
    <div class="split-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.split {
  display: flex;
  width: 100%;
  gap: 5rem;
  margin-bottom: 5rem;
}

.split-left,
.split-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.split-left {
  align-items: flex-end;
}
</style>
