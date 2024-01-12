import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Saved = () => {
  const { data: user, isSuccess, isPending } = useGetCurrentUser();
  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-10">
        <h2 className="text-sm md:text-xl font-semibold">Saved Posts</h2>
        {isSuccess && <GridPostList posts={user.savedPosts} />}
        {isPending && <Loader />}
      </div>
    </div>
  );
};

export default Saved;
