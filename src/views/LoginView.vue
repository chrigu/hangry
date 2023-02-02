<script setup lang="ts">
import Auth from '@/components/Auth.vue'

import {RouterLink, RouterView, useRouter} from 'vue-router'
import {useUserStore} from "@/stores/user";
import {supabase} from "@/supabase";

const userStore = useUserStore()
const router = useRouter()

supabase.auth.onAuthStateChange(async (_, session) => {
  // eslint-disable-next-line no-prototype-builtins
  if (userStore.user?.email == undefined) {
    const { data: { user } } = await supabase.auth.getUser()
    userStore.updateUser(user)
    router.push('/me')
  }
  })
</script>

<template>
  <main>
    <Auth />
  </main>
</template>
