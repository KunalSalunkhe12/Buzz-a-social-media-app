import { Link, NavLink, useLocation } from "react-router-dom";

import { useUserContext } from "@/context/user/UserContext";
import { sidebarLinks } from "@/constants";
import { TNavLink } from "@/types";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const LeftSideBar = () => {
  const { removeToken } = useUserContext();
  const { data: user, isPending, isSuccess } = useGetCurrentUser();
  const { pathname } = useLocation();

  return (
    <nav className="w-[200px] hidden md:flex flex-col justify-between p-6">
      <div className="flex flex-col gap-11">
        <Link to="/">
          <p className="text-secondary font-bold text-2xl">Buzz!</p>
        </Link>
        {!isPending && isSuccess ? (
          <Link to={`/profile/${user._id}`} className="flex gap-2 items-center">
            <img
              src={
                user.imageUrl
                  ? user.imageUrl
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">{user.username}</p>
            </div>
          </Link>
        ) : (
          <Loader />
        )}
        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link: TNavLink) => {
            const isActive = link.route === pathname;

            return (
              <li
                key={link.label}
                className={`p-2 rounded-lg text-sm ${isActive && "bg-primary"}`}
              >
                <NavLink to={link.route} className="flex items-center gap-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`${
                      isActive && "invert brightness-0 transition"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        className="hover:bg-transparent flex justify-start items-center gap-4 p-0"
        variant="ghost"
        onClick={removeToken}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        Logout
      </Button>
    </nav>
  );
};

export default LeftSideBar;
