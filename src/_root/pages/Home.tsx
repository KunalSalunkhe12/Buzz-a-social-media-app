import { useUserContext } from "@/context/user/UserContext";

const Home = () => {
  const { user } = useUserContext();

  console.log(user);
  return <div>Home</div>;
};

export default Home;
