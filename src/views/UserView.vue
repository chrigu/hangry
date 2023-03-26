<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import { supabase } from "../supabase"
import {useRestaurantsStore} from "@/stores/restaurants";
import {ref, onMounted} from "vue";
import {getRestaurants, bulkInsertChoices, getChoicesByUser} from "@/api";
import Item from "@/components/Item.vue";

const userStore = useUserStore()
const restaurantsStore = useRestaurantsStore()
const selectedRestaurants = ref<number[]>([])

onMounted(async () =>
{
  const { data: { user } } = await supabase.auth.getUser()
  const getPreferences = async (userId: string) => {
    const {data, error} = await supabase
        .from('preferences')
        .select()
        .eq('id', userId)

    userStore.updatePreferences(data || [])
  }
  const loadedRestaurants = await getRestaurants()
  restaurantsStore.updateRestaurants(loadedRestaurants || [])

  getPreferences(user?.id || 'some')
  await restaurantsStore.getChoicesForUser()
})


function isChecked (id: number) {
  return selectedRestaurants.value.includes(id)
}

function isSelected (id: number) {
  return restaurantsStore.choices.map(choice => choice.restaurant).includes(id)
}

function update (id: number) {
  const index = selectedRestaurants.value.indexOf(id)
  if (index > -1) {
    selectedRestaurants.value.splice(index, 1) 
  } else {
    selectedRestaurants.value.push(id)
  }
}

function save() {
  bulkInsertChoices(userStore.user?.id, selectedRestaurants.value)

}


</script>

<template>
  <div>
   <div>
     <h1>Where do you want to eat today?</h1>
     <div v-if="restaurantsStore.choices.length == 0">
      <form @submit.prevent="save()">
        <ul>
          <li
              class="mb-2"
              v-if="restaurantsStore.choices.length == 0"
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
                        <span>{{restaurant.icon}} {{restaurant.name}}</span>
                </Item>
            </li>
        </ul>
        <button class="bg-green rounded-lg">Save</button>
      </form>
     </div>
     <div v-else>
      <p>You have already voted. Your votes:</p>
      <ul>
          <li
              class="mb-2"
              v-for="restaurant in restaurantsStore.preferedRestaurants"
              :key="restaurant.id">
                <Item
                  v-if="isSelected(restaurant.id)"
                    :selected="isChecked(restaurant.id)"
                    :msg="restaurant.name">
                      <span>{{restaurant.icon}} {{restaurant.name}}</span>
                </Item>
            </li>
        </ul>
     </div>
   </div>
  </div>
</template>
