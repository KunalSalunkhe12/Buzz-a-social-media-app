import { TPost } from "@/types";
import { Link } from "react-router-dom";

const GridPostList = ({ posts }: { posts: TPost[] }) => {
  if (posts.length === 0) {
    return <p className="text-center text-xl">No posts</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Link
          to={`/post/${post._id}`}
          key={post._id}
          className="w-full h-[300px] justify-self-center border-2"
        >
          <img
            className="object-cover w-full h-full rounded-lg"
            src={post.imageUrl}
            alt={post.caption}
          />
        </Link>
      ))}
    </div>
  );
};

export default GridPostList;
