import { Button } from "../ui/button";

const PostStats = () => {
  return (
    <div className="w-full flex justify-between">
      <Button variant="ghost" className="hover:bg-transparent">
        <img src="assets/icons/like.svg" alt="like" className="w-5 h-5" />
      </Button>
      <Button variant="ghost" className="hover:bg-transparent">
        <img src="assets/icons/save.svg" alt="like" className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default PostStats;
