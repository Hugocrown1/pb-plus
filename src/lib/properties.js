import axios from "axios";

import { cache } from "react";

const baseUrl = process.env.URL + "/api/properties/";

export const getProperty = cache(async (id) => {
  const response = await axios.get(baseUrl + id);
  return response.data;
});
