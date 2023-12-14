import PostForm from "@/components/shared/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1 justify-center overflow-y-scroll custom-scrollbar pb-6">
      <div className="w-full md:w-1/2">
        <div className="flex gap-2 items-center mb-4 md:mb-8">
          <img
            src="/assets/icons/add-post.svg"
            alt="create post"
            className="w-5 h-5"
          />
          <h2 className="text-sm md:text-xl font-semibold">Create Post</h2>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
