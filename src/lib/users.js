import axios from "axios";

import { cache } from "react";

const baseUrl = process.env.URL + "/api/users/";

export const getUser = cache(async (id) => {
  const response = await axios.get(baseUrl + id);

  return response.data;
});
