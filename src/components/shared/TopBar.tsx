import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/user/UserContext";

const TopBar = () => {
  const { user, removeUser } = useUserContext();
  return (
    <section className="sticky top-0 flex md:hidden justify-between items-center p-2">
      <Link to="/">
        <p className="text-primary font-bold text-xl">Buzz</p>
      </Link>
      <div className="flex justify-center items-center">
        <Button
          className="hover:bg-transparent"
          variant="ghost"
          onClick={removeUser}
        >
          <img src="/assets/icons/logout.svg" alt="logout" />
        </Button>
        <Link to={`/profile/${user.result._id}`}>
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"
            className="h-6 w-6 rounded-full"
          />
        </Link>
      </div>
    </section>
  );
};

export default TopBar;
