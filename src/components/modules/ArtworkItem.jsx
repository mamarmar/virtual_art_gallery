import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { updateCollectionArtworks } from "../../utils/apiUtils";

const NoImageContainer = () => {
  return (
    <Stack
      sx={{
        height: "194px",
        justifyContent: "center",
        color: "grey",
      }}
    >
      No image available
    </Stack>
  );
};

const ArtworkItem = ({ artwork }) => {
  const navigate = useNavigate();
  const { images = [] } = artwork;
  const [firstImage = {}] = images;
  const userId = useStore((state) => state.user.id);
  const addToCollection = useStore((state) => state.addToCollection);
  const removeFromCollection = useStore((state) => state.removeFromCollection);
  const savedArtworks = useStore((state) => state.collection.artworks) ?? [];
  const isSavedToCollection = savedArtworks.some(
    (savedArtwork) => savedArtwork.id == artwork.id
  );

  const cardContentStyle = {
    padding: 0,
    marginTop: "8px",
    "&:last-child": {
      paddingBottom: 0,
    },
  };

  const cardTextStyle = {
    fontFamily: "Poppins",
    textAlign: "start",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: userId ? "200px" : "236px",
  };

  const favouriteButtonContainerStyle = {
    padding: 0,
    "&:focus": {
      outline: "none",
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "white",
    },
  };

  const addArtworkToCollection = async () => {
    const updatedSavedArtworks = [...savedArtworks, artwork];
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
    const updatedSavedArtworks = savedArtworks.filter(
      (savedArtwork) => savedArtwork.id != artwork.id
    );
    const response = await updateCollectionArtworks(
      userId,
      updatedSavedArtworks
    );
    if (Object.keys(response).includes("error")) {
      console.log(response.error);
    } else {
      removeFromCollection(artwork.id);
    }
  };

  return (
    <Card
      sx={{
        minHeight: "194px",
        width: "240px",
        padding: "12px",
      }}
    >
      {Object.keys(firstImage).length < 1 ? (
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/details/${artwork.id}`, {replace: false, state: {artwork}})}
        >
          <NoImageContainer />
        </Box>
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={firstImage.url}
          alt={firstImage.altText}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/details/${artwork.id}`, {replace: false, state: {artwork}})}
        />
      )}
      <CardContent sx={cardContentStyle}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack sx={{}}>
            <Typography sx={cardTextStyle}>{artwork.title}</Typography>
            <Typography sx={{ ...cardTextStyle, fontSize: "14px" }}>
              {artwork.artist?.name}
            </Typography>
            <Typography
              sx={{ ...cardTextStyle, color: "grey", fontSize: "14px" }}
            >
              {artwork.year}
            </Typography>
          </Stack>
          {userId && !isSavedToCollection && (
            <IconButton
              sx={favouriteButtonContainerStyle}
              onClick={addArtworkToCollection}
            >
              <FavoriteBorderIcon disableRipple sx={{ color: "#646cff" }} />
            </IconButton>
          )}
          {userId && isSavedToCollection && (
            <IconButton
              sx={favouriteButtonContainerStyle}
              onClick={removeArtworkFromCollection}
            >
              <FavoriteIcon sx={{ color: "#646cff" }} />
            </IconButton>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ArtworkItem;
