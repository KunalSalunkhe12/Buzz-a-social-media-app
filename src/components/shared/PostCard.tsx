import { multiFormatDateString } from "@/lib/utils";
import { TPost } from "@/types";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "@/context/user/UserContext";

type PostCardProps = {
  post: TPost;
};
const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  return (
    <>
      <div className="flex flex-col gap-2">
        <Link
          to={`/profile/${post.creator._id}`}
          className="flex items-center gap-4"
        >
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="Profile"
            className="h-10 w-10"
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
        <div className="h-72 lg:h-[380px] border-2 rounded-md mt-2">
          <img
            className="w-full h-full object-contain object-center"
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
      <hr className="my-5" />
    </>
  );
};

export default PostCard;
