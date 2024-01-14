import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPost } from "@/lib/react-query/queries";
import { TPost } from "@/types";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isPostError,
    isSuccess,
  } = useGetRecentPost();

  if (isPostError) {
    throw new Error();
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-10">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/icons/home.svg"
            alt="create post"
            className="w-5 h-5 invert brightness-0 transition"
          />
          <h2 className="text-sm md:text-xl font-semibold">Home Feed</h2>
        </div>
        {isPostLoading && <Loader />}
        {isSuccess && (
          <ul>
            {posts.map((post: TPost) => (
              <li key={post._id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
