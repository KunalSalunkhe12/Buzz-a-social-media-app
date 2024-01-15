import { useUserContext } from "@/context/user/UserContext";
import { Outlet, Navigate } from "react-router-dom";
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/TopBar";

const RootLayout = () => {
  const { token } = useUserContext();
  return (
    <div className="flex flex-col h-screen overflow-y-auto custom-scrollbar">
      {token ? (
        <>
          <TopBar />

          <section className="md:pl-[230px]">
            <LeftSideBar />
            <div className="flex justify-center px-5 pt-5 pb-20 md:py-10 ">
              <div className="w-full md:w-1/2 flex flex-col gap-8">
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
