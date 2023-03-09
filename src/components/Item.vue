<script setup lang="ts">
defineProps<{
  selected: boolean
}>()
</script>

<template>
  <label
    :class="{'border-gray': !selected, 'border-green': selected}"
    class="text-xl font-bold rounded-lg border-2 py-4 px-20 inline-block text-center w-[335px] cursor-pointer">
      <slot></slot>
  </label>
</template>

<style scoped>
</style>
