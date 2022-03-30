import axios from "axios";

const BASE_URL = `http://localhost:5000/api/`;
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))
  ? JSON.parse(localStorage.getItem("persist:root")).user
  : undefined;
const currentUser = user !== undefined && JSON.parse(user).currentUser;
const TOKEN = user === undefined ? "" : currentUser.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
<<<<<<< HEAD
  header: { token: `Bearer ${TOKEN}` },
=======
  headers: { Authorization: `Bearer ${TOKEN}` },
>>>>>>> ef1fbcb3dbccded3751b8129859c8b16768927c2
});
