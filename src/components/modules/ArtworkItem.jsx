import { Typography, Box, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoImageContainer = () => {
  return <Box height="194px">No image available</Box>;
};

const ArtworkItem = ({ artwork }) => {
  const navigate = useNavigate();
  const { images = [] } = artwork;
  const [firstImage = {}] = images;

  return (
    <Card
      sx={{
        height: "240px",
        minWidth: "150px",
        maxWidth: "180px",
        padding: "12px",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/details/${artwork.id}`)}
    >
      {!firstImage ? (
        <NoImageContainer />
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={firstImage.url}
          alt={firstImage.altText}
        />
      )}
      <CardContent>
        <Typography>{artwork.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default ArtworkItem;
