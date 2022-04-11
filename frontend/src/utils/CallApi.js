import axios from "axios";

const BASE_URL = `http://localhost:5000/api/`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = () => {
  let user = JSON.parse(localStorage.getItem("persist:root"))
    ? JSON.parse(localStorage.getItem("persist:root")).user
    : undefined;

  let current = user !== undefined ? JSON.parse(user).current : undefined;

  let TOKEN =
    current === undefined || current === null ? "" : current.accessToken;

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};
