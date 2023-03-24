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
    console.log('getProfile', data, error)
  return data
  }

// preferences

export const getPreferences = async () => {
    const {data, error} = await supabase
        .from('preferences')
        .select()

    return data
  }

export const getPreferencesForUser = async (userId: string) => {
  const response = await supabase
      .from('preferences')
      .select()
      .eq('id', userId)

  console.log('getPreferencesForUser', userId, response)

  return response
}

export const insertUserPreference = async (userId: string, restaurantId: number) => {
  return await insertPreference('preferences', userId, restaurantId)
}

export const deleteUserPreference = async (userId: string, restaurantId: number) => {
  return await deletePreference('preferences', userId, restaurantId)
}

// choices

export const insertChoice = async (userId: string, restaurantId: number) => {
  return await insertPreference('choices', userId, restaurantId)
}

export const bulkInsertChoices = async (userId: string, restaurantIds: number[]) => {
  const choices = restaurantIds.map(restaurantId => ({ id: userId, restaurant: restaurantId }))

  const { error } = await supabase
  .from('choices')
  .insert(choices)
}

export const getChoicesByUser = async (userId: string) => {
  const {data, error} = await supabase
      .from('choices')
      .select()
      .eq('id', userId)

  return data
}

export const getChoices = async () => {
  const {data, error} = await supabase
      .from('choices')
      .select()

  return data
}

// generic

export const insertPreference = async (table: string, userId: string, restaurantId: number) => {
  const { error } = await supabase
  .from(table)
  .insert({ id: userId, restaurant: restaurantId })
}

export const deletePreference = async (table: string, userId: string, restaurantId: number) => {
  const { error } = await supabase
  .from(table)
  .delete()
  .eq('id', userId)
  .eq('restaurant', restaurantId)
}