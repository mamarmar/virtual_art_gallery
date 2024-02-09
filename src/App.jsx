import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
// import "./App.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
