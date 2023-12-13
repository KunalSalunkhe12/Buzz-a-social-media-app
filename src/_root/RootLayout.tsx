import { useUserContext } from "@/context/user/UserContext";
import { Outlet, Navigate } from "react-router-dom";
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/TopBar";

const RootLayout = () => {
  const { user } = useUserContext();

  return (
    <div className="w-full h-full md:flex">
      {user.token ? (
        <>
          <TopBar />
          <LeftSideBar />

          <section className="flex flex-1">
            <Outlet />
          </section>

          <BottomBar />
        </>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </div>
  );
};

export default RootLayout;
