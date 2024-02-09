import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
// import "./App.css";
import NavigationBar from "./components/modules/NavigationBar.jsx";

function App() {
  return (
    <>
      <NavigationBar />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
