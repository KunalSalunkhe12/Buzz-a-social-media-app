import GridPostList from "@/components/shared/GridPostList";
import { useUserContext } from "@/context/user/UserContext";

const Saved = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-10">
        <h2 className="text-sm md:text-xl font-semibold">Saved Posts</h2>
        <GridPostList posts={user.savedPosts} />
      </div>
    </div>
  );
};

export default Saved;
