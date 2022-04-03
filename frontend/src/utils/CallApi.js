import axios from "axios";

const BASE_URL = `http://localhost:5000/api/`;

const user = JSON.parse(localStorage.getItem("persist:root"))
  ? JSON.parse(localStorage.getItem("persist:root")).user
  : undefined;
const current = user !== undefined && JSON.parse(user).current;
console.log(current);
const TOKEN =
  current === undefined || current === null ? "" : current.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
