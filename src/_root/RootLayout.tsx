import { useUserContext } from "@/context/user/UserContext";
import { Outlet, Navigate } from "react-router-dom";

const RootLayout = () => {
  const { user } = useUserContext();

  return (
    <section>
      {user.token ? (
        <Outlet />
      ) : (
        <Navigate to="/sign-in" state={{ message: "Please Sign in first.." }} />
      )}
    </section>
  );
};

export default RootLayout;
