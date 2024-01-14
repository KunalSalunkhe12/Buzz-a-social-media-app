import { useUserContext } from "@/context/user/UserContext";
import { Outlet, Navigate } from "react-router-dom";
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/TopBar";

const RootLayout = () => {
  const { token } = useUserContext();
  return (
    <div className="">
      {token ? (
        <>
          <TopBar />

          <section className="flex h-screen">
            <LeftSideBar />
            <div className="flex flex-1 justify-center py-10 box-border">
              <div className="w-full md:w-1/2 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
                <Outlet />
              </div>
            </div>
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
