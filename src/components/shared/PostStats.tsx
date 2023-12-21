import { TPost } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { useUserContext } from "@/context/user/UserContext";
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
  post: TPost;
};

const PostStats = ({ post }: PostStatsProps) => {
  const { user } = useUserContext();
  const [likes, setLikes] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);

  const handleLikePost = () => {
    if (checkIsLiked(likes, user._id)) {
      const newLikedList = likes.filter((like) => like !== user._id);
      setLikes(newLikedList);
      return;
    } else {
      setLikes([...likes, user._id]);
    }
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="w-full flex justify-between">
      <Button
        onClick={handleLikePost}
        variant="ghost"
        className="hover:bg-transparent p-0"
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
      </Button>
      <Button
        onClick={handleSavePost}
        variant="ghost"
        className="hover:bg-transparent p-0"
      >
        <img
          src={isSaved ? "assets/icons/saved.svg" : "assets/icons/save.svg"}
          alt="like"
          className="w-6 h-6"
        />
      </Button>
    </div>
  );
};

export default PostStats;
