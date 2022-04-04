import axios from "axios";

const BASE_URL = `http://localhost:5000/api/`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const getToken = () => {
  let user = JSON.parse(localStorage.getItem("persist:root"))
    ? JSON.parse(localStorage.getItem("persist:root")).user
    : undefined;
  console.log(user);
  let current = user !== undefined && JSON.parse(user).current;
  let TOKEN =
    current === undefined || current === null ? "" : current.accessToken;
  return TOKEN;
};

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${getToken()}` },
});
