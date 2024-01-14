import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Saved = () => {
  const { data: user, isSuccess, isPending, isError } = useGetCurrentUser();

  if (isError) {
    throw new Error();
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-10">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/icons/save.svg"
            alt="create post"
            className="w-5 h-5 invert brightness-0 transition"
          />
          <h2 className="text-sm md:text-xl font-semibold">Saved Posts</h2>
        </div>
        {isSuccess && <GridPostList posts={user.savedPosts} />}
        {isPending && <Loader />}
      </div>
    </div>
  );
};

export default Saved;
