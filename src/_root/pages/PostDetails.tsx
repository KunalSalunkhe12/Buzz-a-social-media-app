import { useGetPostById } from "@/lib/react-query/queries";
import { useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isSuccess, isLoading } = useGetPostById(id);

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-full md:w-1/2 flex flex-col">
        {isLoading && <Loader />}
        {isSuccess && <PostCard post={post} />}
      </div>
    </div>
  );
};

export default PostDetails;
