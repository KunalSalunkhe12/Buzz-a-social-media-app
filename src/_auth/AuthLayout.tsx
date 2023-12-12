import { useUserContext } from "@/context/user/UserContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useUserContext();

  return (
    <>
      {user.token ? (
        <Navigate to="/" />
      ) : (
        <section className="flex justify-center items-center p-10 h-screen">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
