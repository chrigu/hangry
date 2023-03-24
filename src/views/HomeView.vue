<script setup lang="ts">
import {useRestaurantsStore} from "@/stores/restaurants";
import { getChoices, getRestaurants } from '@/api';
import { supabase } from "../supabase"
import {ref, onMounted} from "vue";
import type { RestaurantWithCount } from "@/types";

const restaurantStore = useRestaurantsStore()
const selectedRestaurant = ref("")
const restaurantChoices = ref<RestaurantWithCount[]>([])

function selectRestaurant() {
  selectedRestaurant.value = restaurantStore
      .okRestaurants[Math.floor(Math.random()*restaurantStore.okRestaurants.length)].name
}


onMounted(async () =>
{
  const choices = await getChoices()
  restaurantStore.updateChoices(choices)
  const loadedRestaurants = await getRestaurants()
  restaurantStore.updateRestaurants(loadedRestaurants || [])
  restaurantChoices.value = restaurantStore.restaurantChoices
})

</script>

<template>
  <main>
    <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <ol>
      <li
        v-for="restaurant of restaurantChoices"
        :key="restaurant.id">
          {{ restaurant.name }} {{ restaurant.count }}
      </li>
    </ol>
  </main>
</template>
