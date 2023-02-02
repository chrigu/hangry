import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'

import App from './App.vue'
import router from './router'

import {useUserStore} from "@/stores/user";
import {supabase} from "@/supabase";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const userStore = useUserStore()

//const { data: { user } } = await supabase.auth.getUser()
supabase.auth.getUser().then(({ data: { user } }) => {
  userStore.updateUser(user)
  console.log(userStore.user)
})


app.mount('#app')