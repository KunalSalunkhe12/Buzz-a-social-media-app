import PostForm from "@/components/shared/PostForm";
import { useGetPostById } from "@/lib/react-query/queries";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();

  const { data: post, isPending: isGettingPost } = useGetPostById(id);

  if (isGettingPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2">
        <div className="flex gap-2 items-center mb-4 md:mb-8">
          <img
            src="/assets/icons/edit.svg"
            alt="create post"
            className="w-5 h-5"
          />
          <h2 className="text-sm md:text-xl font-semibold">Edit Post</h2>
        </div>
        <PostForm post={post} action="Update" />
      </div>
    </div>
  );
};

export default EditPost;
