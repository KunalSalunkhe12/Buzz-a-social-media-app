import { TPost } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { useUserContext } from "@/context/user/UserContext";
import { checkIsLiked, checkIsSaved } from "@/lib/utils";
import { useLikePost, useSavePost } from "@/lib/react-query/queries";
import { toast } from "../ui/use-toast";

type PostStatsProps = {
  post: TPost;
};

const PostStats = ({ post }: PostStatsProps) => {
  const { user } = useUserContext();
  console.log(user);
  const [likes, setLikes] = useState(post.likes);
  const [savedPosts, setSavedPost] = useState(user.savedPosts);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();

  const handleLikePost = () => {
    let likesList = [...likes];

    if (checkIsLiked(likesList, user._id)) {
      likesList = likesList.filter((like) => like !== user._id);
    } else {
      likesList.push(user._id);
    }

    setLikes(likesList);
    likePost(
      { postId: post._id, likesList },
      {
        onError: () => {
          setLikes(post.likes);
          toast({
            variant: "destructive",
            title: "Something went wrong",
          });
        },
      }
    );
  };

  const handleSavePost = () => {
    let savedPostsList = [...savedPosts];

    if (checkIsSaved(savedPostsList, post._id)) {
      savedPostsList = savedPostsList.filter(
        (savedPost) => savedPost !== post._id
      );
    } else {
      savedPostsList.push(post._id);
    }

    setSavedPost(savedPostsList);
    savePost(savedPostsList, {
      onError: () => {
        setSavedPost(user.savedPosts);
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  };
  return (
    <div className="w-full flex justify-between">
      <Button
        onClick={handleLikePost}
        variant="ghost"
        className="hover:bg-transparent p-0 flex gap-2 items-center"
      >
        <img
          src={
            checkIsLiked(likes, user._id)
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
    </div>
  );
};

export default PostStats;
