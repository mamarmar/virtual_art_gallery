import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../modules/NavigationBar";
import ArtworksGrid from "../modules/ArtworksGrid";
import { useStore } from "../../store/index";

const containerStyle = {
  marginTop: "7em",
  marginBottom: "7em",
  alignItems: "start",
};

const CollectionPage = () => {
  const navigate = useNavigate();
  const collection = useStore((state) => state.collection);
  const savedArtworks = collection.artworks;

  return (
    <>
      <NavigationBar />
      <Stack sx={containerStyle}>
        <button className="text-button" onClick={() => navigate("/")}>
          ← Back to All
        </button>
        {savedArtworks.length < 1 && (
          <p className="no-results-message">
            You have no artworks saved to your collection
          </p>
        )}
        {savedArtworks.length > 0 && (
          <>
            <h1>Saved Artworks</h1>
            <ArtworksGrid artworks={savedArtworks} />
          </>
        )}
      </Stack>
    </>
  );
};

export default CollectionPage;
