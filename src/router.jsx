import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ArtworkDetailsPage from "./components/pages/ArtworkDetailsPage";
import CollectionPage from "./components/pages/CollectionPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/details/:artworkId", element: <ArtworkDetailsPage /> },
  { path: "/collection", element: <CollectionPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);
