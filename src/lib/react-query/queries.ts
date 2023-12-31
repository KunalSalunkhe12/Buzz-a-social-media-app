import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { TNewPost, TNewUser, TUpdatePost } from "@/types";
import {
  createPost,
  createUserAccount,
  getCurrentUser,
  getPostById,
  getPosts,
  getRecentPosts,
  likePost,
  savePost,
  signInAccount,
  updatePost,
} from "@/api";
import { QUERY_KEYS } from "./queryKeys";

/*** USER QUERIES ***/

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
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: async () => {
      const { data } = await getCurrentUser();
      return data.result;
    },
  });
};

/*** POST QUERIES ***/

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postData: TNewPost) => createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: async ({ pageParam }) => {
      const { data } = await getPosts(pageParam);
      return data.result;
    },
    getNextPageParam: ({ nextPage }) => nextPage,
  });
};

export const useGetRecentPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
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
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
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
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetPostById = (postId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: async () => {
      const { data } = await getPostById(postId);
      return data.result;
    },
    enabled: !!postId,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postData,
      postId,
    }: {
      postData: TUpdatePost;
      postId?: string;
    }) => {
      const { data } = await updatePost(postData, postId);
      return data.result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data._id],
      });
    },
  });
};
