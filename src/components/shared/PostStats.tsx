import { Button } from "../ui/button";

const PostStats = () => {
  return (
    <div className="w-full flex justify-between">
      <Button variant="ghost" className="hover:bg-transparent p-0">
        <img src="assets/icons/like.svg" alt="like" className="w-6 h-6" />
      </Button>
      <Button variant="ghost" className="hover:bg-transparent p-0">
        <img src="assets/icons/save.svg" alt="like" className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default PostStats;
