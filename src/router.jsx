import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/screens/HomePage";
import ArtworkDetails from "./components/screens/ArtworkDetails";
import Collection from "./components/screens/Collection";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/details/:artworkId", element: <ArtworkDetails /> },
  { path: "/collection", element: <Collection /> },
]);
