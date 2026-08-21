<script setup lang="ts">
defineProps<{
  title: string
  secondary?: string
  lead?: string
}>()
</script>

<template>
  <header class="section-heading">
    <div class="section-heading-row">
      <h2>{{ title }}</h2>
      <span v-if="secondary">{{ secondary }}</span>
    </div>
    <div v-if="lead || $slots.default" class="section-heading-meta">
      <p v-if="lead">{{ lead }}</p>
      <slot />
    </div>
  </header>
</template>
