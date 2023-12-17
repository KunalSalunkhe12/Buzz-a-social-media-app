import { PostSchema, SignupSchema } from "@/lib/validation";
import { z } from "zod";

export type TNewUser = z.infer<typeof SignupSchema>;

export type TUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  imageUrl: string;
  likedPosts: string[];
  savedPosts: string[];
};

export type TProfile = {
  token: string;
  result: TUser;
};

export type TNavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type TNewPost = z.infer<typeof PostSchema>;

export type TPost = {
  _id: string;
  caption: string;
  creator: TUser;
  imageUrl: string;
  likes: string[];
  saved: string[];
  location: string;
  tags: string[];
  createdAt: string;
};
