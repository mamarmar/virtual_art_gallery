import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStore } from "../../store/index";
import NavigationBar from "../modules/NavigationBar";
import { updateCollectionArtworks } from "../../utils/apiUtils";

const containerStyle = {
  marginTop: "7em",
  marginBottom: "7em",
  alignItems: "start",
};

const artworkDetailsContainerStyle = {
  maxWidth: "35vw",
  minWidth: "400px",
  marginLeft: "48px",
  alignItems: "start",
};

const textStyle = {
  fontFamily: "Poppins",
  textAlign: "start",
};

const favouriteButtonContainerStyle = {
  padding: 0,
  marginBottom: "12px",
  "&:focus": {
    outline: "none",
    backgroundColor: "transparent",
  },
  "&:hover": {
    backgroundColor: "white",
  },
};

const ArtworkDetailsPage = () => {
  const { artworkId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
      <Stack sx={containerStyle}>
        <button className="text-button" onClick={() => navigate("/")}>
          ← Back to All
        </button>
        <Stack direction="row" marginTop="3em">
          {Object.keys(firstImage).length < 1 ? (
            <Stack
              sx={{
                minWidth: "500px",
                minHeight: "200px",
                border: "2px solid #d9dcdc",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ ...textStyle, color: "grey" }}>
                No image available
              </Typography>
            </Stack>
          ) : (
            <div className="img-container">
              <img src={firstImage.url} alt={firstImage.altText ?? ""} />
            </div>
          )}
          <Stack sx={artworkDetailsContainerStyle}>
            {userId && (
              <IconButton
                sx={favouriteButtonContainerStyle}
                onClick={
                  isSavedToCollection
                    ? removeArtworkFromCollection
                    : addArtworkToCollection
                }
              >
                <Typography
                  sx={{
                    ...textStyle,
                    color: isSavedToCollection ? "#646cff" : "grey",
                    marginRight: "8px",
                  }}
                >
                  {isSavedToCollection
                    ? "Saved to Collection"
                    : "Save to Collection"}
                </Typography>
                {isSavedToCollection ? (
                  <FavoriteIcon sx={{ color: "#646cff" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#646cff" }} />
                )}
              </IconButton>
            )}
            <Typography
              sx={{ ...textStyle, fontSize: "1.2em", fontWeight: "500" }}
            >
              {" "}
              {artwork.title}
            </Typography>
            <Typography sx={{ ...textStyle }}>
              {" "}
              By {artwork?.artist?.name ?? "Unknown Artist"}
            </Typography>
            <Typography sx={{ ...textStyle, color: "grey" }}>
              {" "}
              {artwork.year}
            </Typography>
            <Stack sx={{ marginTop: "24px", color: "grey" }}>
              {artwork?.medium && (
                <Typography sx={{ ...textStyle, fontSize: "14px" }}>
                  Medium: {artwork.medium}
                </Typography>
              )}
              {artwork?.culture && (
                <Typography sx={{ ...textStyle, fontSize: "14px" }}>
                  Culture: {artwork.culture}
                </Typography>
              )}
              {artwork?.division && (
                <Typography sx={{ ...textStyle, fontSize: "14px" }}>
                  Division: {artwork.division}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ArtworkDetailsPage;
