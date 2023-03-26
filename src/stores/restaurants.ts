import { defineStore } from 'pinia'
import {useProfilesStore} from "@/stores/profiles"
import { useUserStore } from './user'
import { getChoices, getChoicesByUser } from '@/api';
import { supabase } from "../supabase"

import type { Restaurant, RestaurantWithCount, Preference } from '@/types'

interface RestaurantCount {
  [key: string]: number
}



export const useRestaurantsStore = defineStore({
  id: 'restaurants',
  state: () => ({
    restaurants: <Restaurant[]>[],
    preferences: <Preference[]>[],
    choices: <Preference[]>[]
  }),
  getters: {
    preferedRestaurants (): Restaurant[] {
      const userStore = useUserStore()
      return this.restaurants.filter(restaurant => userStore.preferenceIds.indexOf(+restaurant.id) > -1)
    },
    restaurantChoices (): RestaurantWithCount[] {
      console.log(this.choices, this.restaurants)
      // make sum of choices
      const choices = this.choices.reduce((choices, choice: Preference) => {
        if (choices[choice.restaurant] === undefined) {
          choices[choice.restaurant] = 0
        }
        choices[choice.restaurant] = choices[choice.restaurant] + 1
        return choices
      }, {})
      
      const restaurantChoices = this.restaurants.map(restaurant => {
        const count = choices[restaurant.id] === undefined ? 0 : choices[restaurant.id]
        return Object.assign(restaurant, {count})
      })
      .sort((a, b) => b.count - a.count)
      .filter(restaurant => restaurant.count > 0)
      return restaurantChoices
    }
  },
  actions: {
    updateRestaurants (restaurants: Restaurant[]) {
      this.restaurants = restaurants
    },
    async getChoicesForUser () {
      const { data: { user } } = await supabase.auth.getUser()
      const choices = await getChoicesByUser(user?.id || 'some')
      this.choices = choices
    },
    async getChoices () {
      const choices = await getChoices()
      this.choices = choices
    }
  }
})
