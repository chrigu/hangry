<script setup lang="ts">
import {useUserStore} from "@/stores/user"

const userStore = useUserStore()

function logout() {
  userStore.logout()
}

</script>

<template>
  <header class="py-4 mb-8 px-4 shadow-md">
    <nav class="flex justify-between">
      <div class="flex">
          <img
            class="inline-block mr-2"
            src="/iterativ.svg" />
          <h1 class="text-sm font-medium">Power to the hangry people</h1>
      </div>
      <RouterLink
        v-if="!userStore.user"
        to="/login">Login</RouterLink>
      <div v-else>
        <RouterLink
          class="inline-block mr-4 cursor-pointer"
          to="/me">Profile</RouterLink> 
        <button class="inline-block cursor-pointer" @click="logout">Logout</button>
      </div>
    </nav>
  </header>
  <div class="mx-16">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
