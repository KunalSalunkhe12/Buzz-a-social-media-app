import { Link, useNavigate } from "react-router-dom";

import { TPost } from "@/types";
import PostStats from "./PostStats";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/user/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useDeletePost } from "@/lib/react-query/queries";
import { toast } from "../ui/use-toast";
import Loader from "./Loader";

type PostCardProps = {
  post: TPost;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const navigate = useNavigate();

  const handleDeletePost = () => {
    deletePost(post._id, {
      onSuccess: () => {
        toast({
          title: "Post Deleted Successfully",
          variant: "primary",
        });
        navigate("/");
      },
      onError: () => {
        toast({
          title: "Couldn't delete Post, Try again",
          variant: "destructive",
        });
      },
    });
  };
  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <Link
            to={`/profile/${post.creator._id}`}
            className="flex items-center gap-4"
          >
            <img
              src={
                post.creator.imageUrl
                  ? post.creator.imageUrl
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p>{post.creator.username}</p>
                <p className="text-gray-500 text-sm">
                  {multiFormatDateString(post.createdAt)}
                </p>
              </div>
              <p className="text-xs">{post.location}</p>
            </div>
          </Link>
          {post.creator._id === user._id && (
            <Popover>
              <PopoverTrigger>
                <img
                  src="/assets/icons/edit.svg"
                  alt="Edit icon"
                  className="w-5 h-5"
                />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 w-32">
                <Button>
                  <Link to={`/update-post/${post._id}`}>Edit</Link>
                </Button>
                <Button onClick={handleDeletePost} variant="destructive">
                  {isDeleting ? <Loader /> : "Delete"}
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className=" h-72 lg:h-[380px] border-2 rounded-md mt-2">
          <img
            className="w-full h-full object-contain"
            src={post.imageUrl}
            alt="post image"
          />
        </div>
        <PostStats post={post} userId={user._id} />
        <div className="flex gap-3 text-sm">
          <p>{post.creator.username}</p>
          <p>{post.caption}</p>
        </div>
      </div>
      <hr className="my-10" />
    </>
  );
};

export default PostCard;
