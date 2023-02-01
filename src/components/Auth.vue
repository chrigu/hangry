<template>
  <form class="row flex flex-center" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Login</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          type="submit"
          class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
  <div>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="success" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { supabase } from "../supabase"

const redirectTo = import.meta.env.VITE_REDIRECT_TO
const loading = ref(false)
const email = ref("")
const errorMessage = ref("")
const successMessage = ref("")

const handleLogin = async () => {
  try {
    errorMessage.value = ""
    successMessage.value = ""

    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value, redirectTo })
    if (error) throw error
    successMessage.value = "Check your email for the login link!"
  } catch (error) {
    errorMessage.value = error.error_description || error.message
  } finally {
    loading.value = false
  }
}

</script>