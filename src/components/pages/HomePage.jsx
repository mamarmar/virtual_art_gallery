import NavigationBar from "../modules/NavigationBar";
import { useStore } from "../../store/index";

const HomePage = () => {
  const user = useStore((state) => state.user);

  console.log("USERRR", user);
  return (
    <>
      <NavigationBar />
      Homepage
    </>
  );
};

export default HomePage;
