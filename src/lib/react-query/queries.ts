import { useMutation } from "@tanstack/react-query";
import { TNewPost, TNewUser } from "@/types";
import { createPost, createUserAccount, signInAccount } from "@/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (userData: TNewUser) => createUserAccount(userData),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (userData: { email: string; password: string }) =>
      signInAccount(userData),
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (postData: TNewPost) => createPost(postData),
  });
};
