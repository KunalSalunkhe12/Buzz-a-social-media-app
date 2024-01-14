import { useGetPostById } from "@/lib/react-query/queries";
import { useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isSuccess, isLoading, isError } = useGetPostById(id);

  if (isError) {
    throw new Error();
  }

  return (
    <div>
      {isLoading && <Loader />}
      {isSuccess && <PostCard post={post} />}
    </div>
  );
};

export default PostDetails;
