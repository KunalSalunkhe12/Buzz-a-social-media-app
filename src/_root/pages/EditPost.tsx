import Loader from "@/components/shared/Loader";
import PostForm from "@/components/shared/PostForm";
import { useGetPostById } from "@/lib/react-query/queries";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();

  const { data: post, isPending: isGettingPost } = useGetPostById(id);

  return (
    <>
      <div className="flex gap-2 items-center mb-4 md:mb-8">
        <img
          src="/assets/icons/edit.svg"
          alt="create post"
          className="w-5 h-5 invert brightness-0 transition"
        />
        <h2 className="text-sm md:text-xl font-semibold">Edit Post</h2>
      </div>
      {isGettingPost && <Loader />}
      <PostForm post={post} action="Update" />
    </>
  );
};

export default EditPost;
