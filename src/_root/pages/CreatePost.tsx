import PostForm from "@/components/shared/PostForm";

const CreatePost = () => {
  return (
    <>
      <div className="flex items-center">
        <img
          src="/assets/icons/add-post.svg"
          alt="create post"
          className="w-5 h-5"
        />
        <h2 className="text-sm md:text-xl font-semibold">Create Post</h2>
      </div>
      <PostForm action="Create" />
    </>
  );
};

export default CreatePost;
