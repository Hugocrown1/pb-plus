import axios from "axios";
import { cache } from "react";

const BASE_URL = process.env.URL + "/api/restaurants/";

export const getRestaurants = cache(async () => {
  const response = await axios(BASE_URL);

  return response.data;
});

export const getRestaurant = cache(async (id) => {
  const response = await axios.get(BASE_URL + id);
  return response.data;
});
