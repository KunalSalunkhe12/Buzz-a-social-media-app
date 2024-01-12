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
  imageId: string;
  likedPosts: string[];
  savedPosts: TPost[];
};

export type TUpdateUser = {
  name: string;
  username: string;
  profile: File;
  bio: string;
  imageId: string;
};

export type TNavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type TNewPost = z.infer<typeof PostSchema>;
export type TUpdatePost = TNewPost;

export type TPost = {
  _id: string;
  caption: string;
  creator: TUser;
  imageUrl: string;
  imageId: string;
  likes: string[];
  saved: string[];
  location: string;
  tags: string[];
  createdAt: string;
};

export type TPage = {
  docs: TPost[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};
