import { useMutation } from "@tanstack/react-query";
import { TNewUser } from "@/types";
import { createUserAccount } from "@/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (userData: TNewUser) => createUserAccount(userData),
  });
};
