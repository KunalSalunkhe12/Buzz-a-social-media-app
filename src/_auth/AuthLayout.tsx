import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="flex justify-center items-center p-10 h-screen">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
