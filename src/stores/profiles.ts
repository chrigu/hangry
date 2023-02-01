import { defineStore } from 'pinia'
import type { Profile, Preference } from '@/types'

export const useProfilesStore = defineStore({
  id: 'profiles',
  state: () => ({
    profiles: <Profile[]>[],
    preferences: <Preference[]>[],
    selectedUsers: <string[]>[]
  }),
  getters: {
  },
  actions: {
    updateProfiles(profiles: Profile[]) {
      this.profiles = profiles
      this.selectedUsers = profiles.map(p => p.id)
    },
    updatePreferences (preferences: Preference[]) {
      this.preferences = preferences
    },
    updateSelectedUsers (profileId: string) {
      if (this.selectedUsers.indexOf(profileId) > -1) {
        this.selectedUsers = this.selectedUsers.filter(id => id !== profileId)
      } else {
        this.selectedUsers = [...this.selectedUsers, profileId]
      }
    }
  }
})
