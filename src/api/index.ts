import axios, { AxiosResponse } from "axios";
import { TNewPost, TNewUser, TUser } from "@/types";

const url = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return req;
});

// User
export const createUserAccount = (userData: TNewUser) =>
  API.post("/user/signup", userData);

export const signInAccount = (userData: { email: string; password: string }) =>
  API.post("/user/signin", userData);

export const getCurrentUser: () => Promise<AxiosResponse<TUser>> = () =>
  API.get("/user");

export const savePost = (savedPostList: string[]) =>
  API.put("/user/save-post", { savedPostList });

// Post
export const createPost = (postData: TNewPost) =>
  API.post("/post", postData, {
    headers: { "content-type": "multipart/form-data" },
  });

export const getRecentPosts = () => API.get("/post");

export const likePost = (postId: string, likesList: string[]) =>
  API.put(`post/like/${postId}`, { postId, likesList });
