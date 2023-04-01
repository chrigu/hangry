// @ts-nocheck
import RestaurantList from "@/components/RestaurantList.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof RestaurantList> = {
  title: "RestaurantList",
  component: RestaurantList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RestaurantList>;

export const NoSelection: Story = {
  args: {
    choices: [],
    preferedRestaurants: [{"id":1,"inserted_at":"2022-10-21T14:58:02.625834+00:00","updated_at":"2022-10-21T14:58:02.625834+00:00","name":"Curry Legende","icon":"🍛","count":0},{"id":4,"inserted_at":"2022-11-09T14:00:51.581447+00:00","updated_at":"2022-11-09T14:00:51.581447+00:00","name":"Alibaba","icon":"🧆","count":0},{"id":2,"inserted_at":"2022-11-09T14:00:29.629251+00:00","updated_at":"2022-11-09T14:00:29.629251+00:00","name":"Bibimbap","icon":"🍚","count":0}],
    selectedRestaurants: [],
  },
};