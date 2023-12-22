import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TNewPost, TNewUser } from "@/types";
import {
  createPost,
  createUserAccount,
  getCurrentUser,
  getRecentPosts,
  likePost,
  savePost,
  signInAccount,
} from "@/api";
import { QueryKeys } from "./queryKeys";

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

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QueryKeys.GET_CURRENT_USER],
    queryFn: async () => {
      const { data } = await getCurrentUser();
      return data.result;
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postData: TNewPost) => createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPost = () => {
  return useQuery({
    queryKey: [QueryKeys.GET_RECENT_POSTS],
    queryFn: async () => {
      const { data } = await getRecentPosts();
      return data.result;
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesList,
    }: {
      postId: string;
      likesList: string[];
    }) => likePost(postId, likesList),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_RECENT_POSTS],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedPostList: string[]) => savePost(savedPostList),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_CURRENT_USER],
      });
    },
  });
};
