import axios from "axios";
import { TNewPost, TNewUser } from "@/types";

const url = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") as string).token
    }`;
  }
  return req;
});

export const createUserAccount = (userData: TNewUser) =>
  API.post("/user/signup", userData);

export const signInAccount = (userData: { email: string; password: string }) =>
  API.post("/user/signin", userData);

export const createPost = (postData: TNewPost) =>
  API.post("/post", postData, {
    headers: { "content-type": "multipart/form-data" },
  });
