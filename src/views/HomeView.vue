<script setup lang="ts">
import PersonSelector from '../components/PersonSelector.vue'
import RestaurantList from '../components/RestaurantList.vue'
import {useRestaurantsStore} from "@/stores/restaurants";
import {ref} from "vue";

const restaurantStore = useRestaurantsStore()
const selectedRestaurant = ref(null)

function selectRestaurant() {
  selectedRestaurant.value = restaurantStore
      .okRestaurants[Math.floor(Math.random()*restaurantStore.okRestaurants.length)].name
}

</script>

<template>
  <main>
    <PersonSelector />
    <RestaurantList />
    <button
      @click="selectRestaurant()"
      class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
      <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span class="relative text-black group-hover:text-white">Go eat 🍔</span>
    </button>
    <div v-if="selectedRestaurant">Resto: {{selectedRestaurant}}</div>
  </main>
</template>
