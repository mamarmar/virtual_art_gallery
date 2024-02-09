import { createBrowserRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./components/pages/HomePage";
import ArtworkDetailsPage from "./components/pages/ArtworkDetailsPage";
import CollectionPage from "./components/pages/CollectionPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

const getAllArtworks = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_HARVARD_MUSEUMS_API
      }/object?size=10&classification=Paintings&apikey=${
        import.meta.env.VITE_HARVARD_MUSEUMS_API_KEY
      }`
    );
    console.log("RESPONSE", response);
    //Update global state
    return response.data;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: getAllArtworks,
  },
  { path: "/details/:artworkId", element: <ArtworkDetailsPage /> },
  { path: "/collection", element: <CollectionPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);
