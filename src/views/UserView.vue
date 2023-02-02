<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import { supabase } from "../supabase"
import {useRestaurantsStore} from "@/stores/restaurants";
import {ref, onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";
import {getRestaurants} from "@/api";

const userStore = useUserStore()
const restaurantsStore = useRestaurantsStore()

const {restaurants} = storeToRefs(restaurantsStore)

onMounted(async () =>
{
  console.log('mounted')

  const getPreferences = async () => {
    const {data, error} = await supabase
        .from('preferences')
        .select()
        .eq('id', userStore.user?.id)

    userStore.updatePreferences(data || [])
  }

  const loadedRestaurants = await getRestaurants()
  restaurantsStore.updateRestaurants(loadedRestaurants || [])
  getPreferences()
})

async function update (event: MouseEvent, restaurantId: string) {
  console.log('update', (event.currentTarget as HTMLInputElement).checked, restaurantId)
  if (!userStore.user) {
    return;
  }
  userStore.updatePreference((event.currentTarget as HTMLInputElement)?.checked, {id: userStore.user?.id, restaurant: +restaurantId})

  if ((event.currentTarget as HTMLInputElement)?.checked) {
    const { error } = await supabase
      .from('preferences')
      .insert({ id: userStore.user.id, restaurant: restaurantId })
  } else {
    const { error } = await supabase
        .from('preferences')
        .delete()
        .eq('id', userStore.user.id)
        .eq('restaurant', restaurantId)
  }
}

function isChecked (id: number) {
  return userStore.preferenceIds.indexOf(id) > -1
}

</script>

<template>
  <div>
   <div>
     <h1>Deine Restaurants</h1>
     <p>Hallo {{userStore.user?.email}}, wähle deine bevorzugten Restaurtants aus:</p>
     <div>
      <form>
        <ul>
          <li
              v-for="restaurant in restaurants"
              :key="restaurant.id">
            <input
                type="checkbox"
                name="restaurant"
                @click="update($event, restaurant.id)"
                :checked="isChecked(+restaurant.id)"
                :value="restaurant.id">
            <label class="ml-2" :for="restaurant.id">{{restaurant.name}}</label>
        </li>
        </ul>
      </form>
     </div>
     <RouterLink
      class="cursor-pointer"
      to="/">Go eat</RouterLink> 
   </div>
  </div>
</template>
