import { useParams, useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useStore } from "../../store/index";
import NavigationBar from "../modules/NavigationBar";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { updateCollectionArtworks } from "../../utils/apiUtils";

const ArtworkDetailsPage = () => {
  const { artworkId } = useParams();
  const location = useLocation();
  const userId = useStore((state) => state.user.id);
  const collection = useStore((state) => state.collection);
  const {
    state: { artwork = {} },
  } = location;
  const { images = [] } = artwork;
  const [firstImage = {}] = images;
  const addToCollection = useStore((state) => state.addToCollection);
  const removeFromCollection = useStore((state) => state.removeFromCollection);
  const isSavedToCollection = collection?.artworks?.some(
    (artwork) => artwork.id == artworkId
  );

  const addArtworkToCollection = async () => {
    const updatedSavedArtworks = [...collection.artworks, artwork];
    const response = await updateCollectionArtworks(
      userId,
      updatedSavedArtworks
    );
    if (Object.keys(response).includes("error")) {
      console.log(response.error);
    } else {
      addToCollection(artwork);
    }
  };

  const removeArtworkFromCollection = async () => {
    const updatedSavedArtworks = collection.artworks.filter(
      (savedArtwork) => savedArtwork.id != artwork.id
    );
    const response = await updateCollectionArtworks(
      userId,
      updatedSavedArtworks
    );
    if (Object.keys(response).includes("error")) {
      console.log(response.error);
    } else {
      removeFromCollection(artworkId);
    }
  };

  return (
    <>
      <NavigationBar />
      <Box>
        <img
          src={firstImage.url}
          alt={firstImage.altText ?? ""}
          height={firstImage.height < 480 ? firstImage.height : "480px"}
        />
      </Box>
      {userId && (
        <Button
          onClick={
            isSavedToCollection
              ? removeArtworkFromCollection
              : addArtworkToCollection
          }
          endIcon={
            isSavedToCollection ? <BookmarkAddedIcon /> : <BookmarkAddIcon />
          }
        >
          {isSavedToCollection ? "Saved to Collection" : "Save to Collection"}
        </Button>
      )}
      <p>Artwork Details Page {artwork.title}</p>
    </>
  );
};

export default ArtworkDetailsPage;
