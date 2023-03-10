<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import { supabase } from "../supabase"
import {useRestaurantsStore} from "@/stores/restaurants";
import {ref, onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";
import {getRestaurants} from "@/api";
import Item from "@/components/Item.vue";
import type {Restaurant} from "@/types";

const userStore = useUserStore()
const restaurantsStore = useRestaurantsStore()
const {restaurants} = storeToRefs(restaurantsStore)
const selectedRestaurants = reactive([])

onMounted(async () =>
{
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


function isChecked (id: number) {
  return userStore.preferenceIds.indexOf(id) > -1
}


</script>

<template>
  <div>
   <div>
     <h1>Where do you want to eat today?</h1>
     <div>
      <form>
        <ul>
          <li
              class="mb-2"
              v-for="restaurant in restaurantsStore.preferedRestaurants"
              :key="restaurant.id">
                <Item
                    :selected="isChecked(restaurant.id)"
                    :msg="restaurant.name">
                    <input
                        type="checkbox"
                        class="hidden"
                        @click="update($event, restaurant.id)"
                        :checked="isChecked(+restaurant.id)"
                        :value="restaurant.id">
                        <span>{{restaurant.name}}</span>
                </Item>
            </li>
        </ul>
      </form>
     </div>
   </div>
  </div>
</template>
