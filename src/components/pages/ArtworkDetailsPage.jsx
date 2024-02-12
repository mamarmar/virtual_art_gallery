import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useStore } from "../../store/index";
import NavigationBar from "../modules/NavigationBar";

const ArtworkDetailsPage = () => {
  const { artworkId } = useParams();
  const artworks = useStore((state) => state.artworks);
  const artwork = artworks.find((artwork) => artwork.id == artworkId);
  const { images = [] } = artwork;
  const [firstImage = {}] = images;

  return (
    <>
      <NavigationBar />
      <Box>
        <img src={firstImage.url} alt={firstImage.altText ?? ""} height={firstImage.height < 480 ? firstImage.height : "480px"} />
      </Box>
      <p>Artwork Details Page {artwork.title}</p>
    </>
  );
};

export default ArtworkDetailsPage;
