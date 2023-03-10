import { defineStore } from 'pinia'
import {useProfilesStore} from "@/stores/profiles"
import { useUserStore } from './user'

import type { Restaurant, Preference } from '@/types'

interface RestaurantCount {
  [key: string]: number
}

export const useRestaurantsStore = defineStore({
  id: 'restaurants',
  state: () => ({
    restaurants: <Restaurant[]>[],
    preferences: <Preference[]>[]
  }),
  getters: {
    preferedRestaurants (): Restaurant[] {
      const userStore = useUserStore()
      return this.restaurants.filter(restaurant => userStore.preferenceIds.indexOf(+restaurant.id) > -1)
    },
    okRestaurants (): Restaurant[] {
      const profileStore = useProfilesStore()
      const numberSelectedUsers = profileStore.selectedUsers.length
      const okRestaurants = <string[]>[]

      const restaurantsWithCount = profileStore.preferences
        .filter(preference => profileStore.selectedUsers.indexOf(preference.id) > -1)
        .reduce((restaurants, preference) => {
          console.log(restaurants, preference)
          const restaurantKeys = Object.keys(restaurants)

          if (restaurantKeys.indexOf(preference.restaurant.toString()) === -1) {
            restaurants[preference.restaurant] = 0
          }
          restaurants[preference.restaurant] = restaurants[preference.restaurant] + 1
          return restaurants
        }, <RestaurantCount>{})

      console.log('restaurants', restaurantsWithCount)

      for (const restaurantId in restaurantsWithCount) {
        if (restaurantsWithCount[restaurantId] === numberSelectedUsers) {
          okRestaurants.push(restaurantId)
        }
      }

      return this.restaurants.filter(restaurant => okRestaurants.indexOf(restaurant.id.toString()) > -1)
    }
  },
  actions: {
    updateRestaurants (restaurants: Restaurant[]) {
      this.restaurants = restaurants
    },
  }
})
