import { PostSchema, SignupSchema } from "@/lib/validation";
import { z } from "zod";

export type TNewUser = z.infer<typeof SignupSchema>;

export type TUser = {
  token: string;
  result: {
    _id: string;
    name: string;
    username: string;
    email: string;
    bio: string;
    imageUrl: string;
    likedPosts: string[];
    savedPosts: string[];
  };
};

export type TNavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type TNewPost = z.infer<typeof PostSchema>;
