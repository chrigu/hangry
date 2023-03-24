<script setup lang="ts">
import {useUserStore} from "@/stores/user"

const emit = defineEmits(['click'])

const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  emit('click')
}

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
          @click="$emit('click')"
          to="/preferences">Your restaurants</RouterLink> 
    </li>
    <li>
        <button class="inline-block cursor-pointer" @click="handleLogout()">Logout</button>
    </li>
  </ul>
  </nav>
</template>