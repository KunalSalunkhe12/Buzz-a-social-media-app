import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      return navigate("/sign-in");
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <p className="text-2xl font-semibold">Something Went Wrong!!</p>
      <p>You will be Redirected to sign-in page</p>
    </div>
  );
}

export default Error;
