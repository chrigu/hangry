<script setup lang="ts">

import {onMounted} from "vue";
import {useProfilesStore} from "@/stores/profiles";
import {getRestaurants, getProfiles, getPreferences} from "@/api";
import {useRestaurantsStore} from "@/stores/restaurants";
import {useUserStore} from "@/stores/user";

const profileStore = useProfilesStore()
const restaurantStore = useRestaurantsStore()

onMounted(async () =>
{
  console.log('mounted')

  const profiles = await getProfiles() || []
  const preferences = await getPreferences() || []
  const restaurants = await getRestaurants() || []
  restaurantStore.updateRestaurants(restaurants)
  profileStore.updateProfiles(profiles)
  profileStore.updatePreferences(preferences)
})

function isChecked (profileId: string) {
  return profileStore.selectedUsers.indexOf(profileId) > -1
}

function update (event, profileId: string) {
  console.log('update', event.currentTarget.checked, profileId)
  profileStore.updateSelectedUsers(profileId)
}

</script>

<template>
  <div>
    <h1>Select all the hangry people</h1>
        <form>
          <div
              v-for="profile in profileStore.profiles"
              :key="profile.id">
            <input
                type="checkbox"
                name="profile"
                @click="update($event, profile.id)"
                :checked="isChecked(profile.id)"
                :value="profile.id">
            <label class="ml-2" :for="profile.id">{{profile.username}}</label>
          </div>
        </form>
  </div>
</template>
