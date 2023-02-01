import {supabase} from "@/supabase";

export const getRestaurants = async () => {
    const {data, error} = await supabase
        .from('restaurants')
        .select()
    console.log(data, error)
    return data
  }

export const getProfiles = async () => {
    const {data, error} = await supabase
        .from('profiles')
        .select('id, username')
    console.log(data, error)
  return data
  }

export const getPreferences = async () => {
    const {data, error} = await supabase
        .from('preferences')
        .select()

    return data
  }