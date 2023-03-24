<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import { supabase } from "../supabase"
import {useRestaurantsStore} from "@/stores/restaurants";
import {ref, onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";
import {getRestaurants} from "@/api";
import Item from "@/components/Item.vue";

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
  <div class="flex justify-center">
    <div>
        <h1>Select your prefered restaurants</h1>
        <div>
            <form>
              <ul>
                <li
                    class="mb-2"
                    v-for="restaurant in restaurants"
                    :key="restaurant.id">
                      <Item
                          :selected="isChecked(+restaurant.id)"
                          :msg="restaurant.name">
                          <input
                              type="checkbox"
                              class="hidden"
                              @click="update($event, restaurant.id)"
                              :checked="isChecked(+restaurant.id)"
                              :value="restaurant.id">
                              <span>{{restaurants.icon}} {{restaurant.name}}</span>
                      </Item>
                  </li>
              </ul>
            </form>
        </div>
    </div>
</div>
</template>
