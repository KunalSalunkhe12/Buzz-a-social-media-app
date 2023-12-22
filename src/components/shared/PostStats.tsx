import { TPost } from "@/types";
import { Button } from "../ui/button";
import { checkIsLiked, checkIsSaved } from "@/lib/utils";
import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";
import { useEffect, useState } from "react";

type PostStatsProps = {
  post: TPost;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { data: currentUser, isPending } = useGetCurrentUser();

  const [likes, setLikes] = useState(post.likes);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  useEffect(() => {
    currentUser && setSavedPosts(currentUser?.savedPosts);
  }, [currentUser]);

  const handleLikePost = () => {
    let likesList = [...likes];
    if (checkIsLiked(likesList, userId)) {
      likesList = likesList.filter((like) => like !== userId);
    } else {
      likesList = [...likesList, userId];
    }

    likePost({ postId: post._id, likesList });
    setLikes(likesList);
  };

  const handleSavePost = () => {
    if (savedPosts) {
      let savedPostsList = [...savedPosts];
      if (checkIsSaved(savedPostsList, post._id)) {
        savedPostsList = savedPostsList.filter(
          (savedPost) => savedPost !== post._id
        );
      } else {
        savedPostsList = [...savedPosts, post._id];
      }
      savePost(savedPostsList);
      setSavedPosts(savedPostsList);
    }
  };

  return (
    <div className="w-full flex justify-between">
      {!isPending && currentUser ? (
        <>
          <Button
            onClick={handleLikePost}
            variant="ghost"
            className="hover:bg-transparent p-0 flex gap-2 items-center"
          >
            <img
              src={
                checkIsLiked(likes, userId)
                  ? "assets/icons/liked.svg"
                  : "assets/icons/like.svg"
              }
              alt="like"
              className="w-6 h-6"
            />
            <p>{likes.length}</p>
          </Button>
          <Button
            onClick={handleSavePost}
            variant="ghost"
            className="hover:bg-transparent p-0"
          >
            <img
              src={
                checkIsSaved(savedPosts, post._id)
                  ? "assets/icons/saved.svg"
                  : "assets/icons/save.svg"
              }
              alt="like"
              className="w-6 h-6"
            />
          </Button>
        </>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};

export default PostStats;
