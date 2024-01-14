import { useUserContext } from "@/context/user/UserContext";
import { Outlet, Navigate } from "react-router-dom";
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/TopBar";

const RootLayout = () => {
  const { token } = useUserContext();
  return (
    <div className="flex flex-col">
      {token ? (
        <>
          <TopBar />

          <section className="flex flex-1 max-h-screen">
            <LeftSideBar />
            <div className="flex w-full justify-center p-5 md:py-10 box-border">
              <div className="w-full md:w-1/2 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
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
