import { Link, NavLink, useLocation } from "react-router-dom";

import { useUserContext } from "@/context/user/UserContext";
import { sidebarLinks } from "@/constants";
import { TNavLink } from "@/types";
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const { user, removeUser } = useUserContext();
  const { pathname } = useLocation();

  return (
    <nav className="w-[240px] hidden md:flex flex-col justify-between p-6">
      <div className="flex flex-col gap-11">
        <Link to="/">
          <p className="text-secondary font-bold text-2xl">Buzz!</p>
        </Link>
        <Link
          to={`/profile/${user.result._id}`}
          className="flex gap-4 items-center"
        >
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h2 className="font-medium">{user.result.name}</h2>
            <p className="text-sm text-slate-500">@{user.result.username}</p>
          </div>
        </Link>
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
        onClick={removeUser}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        Logout
      </Button>
    </nav>
  );
};

export default LeftSideBar;