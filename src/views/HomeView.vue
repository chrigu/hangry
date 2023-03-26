<script setup lang="ts">
import {useRestaurantsStore} from "@/stores/restaurants";
import { getChoices, getRestaurants } from '@/api';
import { supabase } from "../supabase"
import {ref, onMounted} from "vue";
import type { RestaurantWithCount } from "@/types";

const restaurantStore = useRestaurantsStore()
const selectedRestaurant = ref("")


onMounted(async () =>
{
  await restaurantStore.getChoices() 
  const loadedRestaurants = await getRestaurants()
  restaurantStore.updateRestaurants(loadedRestaurants || [])
})

</script>

<template>
  <main>
    <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <div v-if="restaurantStore.restaurantChoices.length > 0">
      <div>
        <p>{{ restaurantStore.restaurantChoices[0].icon }}</p>
        <p>{{ restaurantStore.restaurantChoices[0].name }}</p>
      </div>
      <ol v-if="restaurantStore.restaurantChoices.length > 1">
        <li
          v-for="restaurant of restaurantStore.restaurantChoices.slice(1)"
          :key="restaurant.id">
            {{ restaurant.name }} {{ restaurant.count }}
        </li>
      </ol>
    </div>
  </main>
</template>
