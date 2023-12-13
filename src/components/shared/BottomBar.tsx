import { NavLink, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";
import { TNavLink } from "@/types";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="absolute md:hidden bottom-0 right-0 p-2 w-full">
      <ul className="flex justify-between">
        {bottombarLinks.map((link: TNavLink) => {
          const isActive = link.route === pathname;

          return (
            <li
              key={link.label}
              className={`p-2 rounded-lg text-sm ${isActive && "bg-primary"}`}
            >
              <NavLink
                to={link.route}
                className="flex flex-col items-center gap-1 text-xs"
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`h-4 w-4 ${
                    isActive && "invert brightness-0 transition"
                  }`}
                />
                <p>{link.label}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomBar;
