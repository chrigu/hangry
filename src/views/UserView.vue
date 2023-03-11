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
const selectedRestaurants = ref<number[]>([])

onMounted(async () =>
{
  const getPreferences = async (userId: string) => {
    const {data, error} = await supabase
        .from('preferences')
        .select()
        .eq('id', userId)

    userStore.updatePreferences(data || [])
  }
  const loadedRestaurants = await getRestaurants()
  restaurantsStore.updateRestaurants(loadedRestaurants || [])
  console.log(userStore.user?.id)
  getPreferences(userStore.user?.id || 'some')
})


function isChecked (id: number) {
  return selectedRestaurants.value.includes(id)
}

function update (id: number) {
  const index = selectedRestaurants.value.indexOf(id)
  if (index > -1) {
    selectedRestaurants.value.splice(index, 1) 
  } else {
    selectedRestaurants.value.push(id)
  }
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
                        @click="update(restaurant.id)"
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
