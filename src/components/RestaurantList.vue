<script setup lang="ts">

import type { Preference, Restaurant } from "@/types";
import Item from "@/components/Item.vue";

const props = defineProps<{
  choices: Preference[],
  preferedRestaurants: Restaurant[],
  selectedRestaurants: number[],
}>()

const emit = defineEmits(['update'])

function isChecked (id: number) {
  return props.selectedRestaurants.includes(id)
}

</script>

<template>
  <ul>
    <li
        class="mb-2"
        v-if="choices.length == 0"
        v-for="restaurant in preferedRestaurants"
        :key="restaurant.id">
          <Item
              :selected="isChecked(+restaurant.id)"
              :msg="restaurant.name">
              <input
                  type="checkbox"
                  class="hidden"
                  @click="emit('update', restaurant.id)"
                  :checked="isChecked(+restaurant.id)"
                  :value="restaurant.id">
                  <span>{{restaurant.icon}} {{restaurant.name}}</span>
          </Item>
      </li>
  </ul>
</template>
