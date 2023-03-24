<script setup lang="ts">
import {useUserStore} from "@/stores/user"
import {ref} from "vue"
import Menu from "@/components/Menu.vue"

const showModal = ref(false)

</script>

<template>
  <header class="py-4 mb-8 px-4">
    <nav class="flex justify-between">
      <div class="flex">
          <img
            class="inline-block mr-2"
            src="/iterativ.svg" />
          <h1 class="text-sm font-medium">Power to the hangry people</h1>
      </div>
      <button @click="showModal = true"><img
        src="/menu.svg" />
        </button>
    </nav>
  </header>
  <div class="px-4">
    <RouterView />
  </div>
    <Teleport to="body">
      <div v-if="showModal"
        class="absolute w-full h-full top-0 left-0 bg-white">
        <div class="py-4 mb-8 px-4 inline-block text-right w-full">
            <button @click="showModal = false">
                <img src="/close.svg" />
            </button>
        </div>
        <Menu @click="showModal = false" />
      </div>
    </Teleport>
</template>

<style scoped>
</style>
