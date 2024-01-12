import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  TNewPost,
  TNewUser,
  TPost,
  TUpdatePost,
  TUpdateUser,
  TUser,
} from "@/types";
import {
  createPost,
  createUserAccount,
  deletePost,
  getCurrentUser,
  getPostById,
  getPosts,
  getRecentPosts,
  getUserById,
  likePost,
  savePost,
  searchPosts,
  signInAccount,
  updatePost,
  updateProfile,
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

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => {
      const { data } = await getUserById(userId);
      return data.result as TUser & { posts: TPost[] };
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: TUpdateUser) => updateProfile(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
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
      return data.result as TPost;
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

export const useSearchPosts = (searchQuery: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchQuery],
    queryFn: async () => {
      const { data } = await searchPosts(searchQuery);

      if (!data) return [];

      return data.result;
    },
    getNextPageParam: ({ nextPage }) => nextPage,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
