<script setup lang="ts">

import {onMounted} from "vue";
import {getRestaurants, getProfiles, getPreferences} from "@/api";
import {useRestaurantsStore} from "@/stores/restaurants";

const restaurantStore = useRestaurantsStore()

onMounted(async () =>
{
  console.log('mounted')

  const profiles = await getProfiles()
  const preferences = await getPreferences()
  const restaurants = await getRestaurants()
})


</script>

<template>
  <div>
    <ul>
      <li v-for="restaurant in restaurantStore.okRestaurants" :key="restaurant.id">{{restaurant.name}}</li>
    </ul>
  </div>
</template>
