import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/user/UserContext";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "./Loader";

const TopBar = () => {
  const { removeToken } = useUserContext();
  const { data: user, isPending, isSuccess } = useGetCurrentUser();
  return (
    <section className="sticky top-0 flex md:hidden justify-between items-center p-2">
      <Link to="/">
        <p className="font-bold text-xl text-secondary">Buzz</p>
      </Link>
      <div className="flex justify-center items-center">
        <Button
          className="hover:bg-transparent"
          variant="ghost"
          onClick={removeToken}
        >
          <img
            className="h-5 w-5"
            src="/assets/icons/logout.svg"
            alt="logout"
          />
        </Button>
        {isPending && <Loader />}
        {isSuccess && (
          <Link to={`/profile/${user._id}`}>
            <img
              src={
                user.imageUrl
                  ? user.imageUrl
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-5 w-5 rounded-full object-cover"
            />
          </Link>
        )}
      </div>
    </section>
  );
};

export default TopBar;
