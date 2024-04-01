import axios from "axios";

const BASE_URL = process.env.URL + "/api/events";

export const getEvents = async () => {
  const res = await axios(BASE_URL);

  return res.data;
};
