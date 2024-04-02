import axios from "axios";
import { cache } from "react";

const BASE_URL = process.env.URL + "/api/events/";

export const getEvents = cache(async () => {
  const response = await axios(BASE_URL);

  return response.data;
});

export const getEvent = cache(async (id) => {
  const response = await axios.get(BASE_URL + id);
  return response.data;
});
