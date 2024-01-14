import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Saved = () => {
  const { data: user, isSuccess, isPending, isError } = useGetCurrentUser();

  if (isError) {
    throw new Error();
  }

  return (
    <>
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
    </>
  );
};

export default Saved;
