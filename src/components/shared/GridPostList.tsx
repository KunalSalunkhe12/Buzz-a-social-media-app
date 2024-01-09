import { TPage } from "@/types";
import { Link } from "react-router-dom";

const GridPostList = ({ pages }: { pages: TPage[] }) => {
  const posts = pages.map((page) => page.docs).flat();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Link
          to={`/post/${post._id}`}
          key={post._id}
          className="w-full h-[300px] justify-self-center"
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
