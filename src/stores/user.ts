import { defineStore } from 'pinia'
import {supabase} from "@/supabase";
import type { Preference } from '@/types'

interface User {
  id: string;
  email: string;
}

interface UserStore {
  user: User | null;
  userPreferences: Preference[];
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => (<UserStore>{
    user: null,
    userPreferences: []
  }),
  getters: {
    preferenceIds: (state: UserStore) => state.userPreferences.map(pref => pref.restaurant)
  },
  actions: {
    updateUser (user: any) {
      this.user = user
    },
    updatePreferences (preferences: Preference[]) {
      this.userPreferences = preferences
    },
    updatePreference(add: boolean, preference: Preference) {
      if (add) {
        this.userPreferences = [...this.userPreferences, preference]
      } else {
        this.userPreferences = this.userPreferences.filter(p => p.restaurant != preference.restaurant)
      }
    },
    async logout() {
      await supabase.auth.signOut();
    }
  }
})
