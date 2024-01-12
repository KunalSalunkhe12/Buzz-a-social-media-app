import axios, { AxiosResponse } from "axios";
import { TNewPost, TNewUser, TUpdatePost, TUpdateUser, TUser } from "@/types";

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

export const getCurrentUser: () => Promise<
  AxiosResponse<{ result: TUser }>
> = () => API.get("/user");

export const getUserById = (userId: string) => API.get(`/user/${userId}`);

export const savePost = (savedPostsList: string[]) =>
  API.put("/user/save-post", { savedPostsList });

export const updateProfile = (userData: TUpdateUser) =>
  API.put("/user/update", userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Post
export const getRecentPosts = () => API.get("/post/recent");

export const getPosts = (pageParam: number) =>
  API.get(`/post?page=${pageParam}`);

export const createPost = (postData: TNewPost) =>
  API.post("/post", postData, {
    headers: { "content-type": "multipart/form-data" },
  });

export const searchPosts = (searchQuery: string) =>
  API.get(`/search/post?q=${searchQuery}`);

export const likePost = (postId: string, likesList: string[]) =>
  API.put(`post/like/${postId}`, { postId, likesList });

export const getPostById = (postId?: string) => API.get(`/post/${postId}`);

export const updatePost = (postData: TUpdatePost, postId?: string) => {
  return API.put(`/post/${postId}`, postData, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const deletePost = (postId: string) => API.delete(`/post/${postId}`);
