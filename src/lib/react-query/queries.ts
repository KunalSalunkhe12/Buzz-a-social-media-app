import { useMutation } from "@tanstack/react-query";
import { TNewUser } from "@/types";
import { createUserAccount, signInAccount } from "@/api";

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
