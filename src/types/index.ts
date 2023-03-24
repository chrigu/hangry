export interface Profile {
  id: string;
  username: string;
}

export interface Preference {
  id: string;
  restaurant: number;
}

export interface Restaurant {
  id: string;
  icon: string;
  name: string;
}

export interface RestaurantWithCount extends Restaurant {
  count: number
}