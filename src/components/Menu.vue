<script setup lang="ts">
import {useUserStore} from "@/stores/user"

const userStore = useUserStore()
</script>
<template>
  <nav>
    <RouterLink
        v-if="!userStore.user"
        to="/login">Login</RouterLink>
  <ul v-else>
    <li>
        <RouterLink
          class="inline-block mr-4 cursor-pointer"
          to="/preferences">Your restaurants</RouterLink> 
    </li>
    <li>
        <button class="inline-block cursor-pointer" @click="logout">Logout</button>
    </li>
  </ul>
  </nav>
</template>