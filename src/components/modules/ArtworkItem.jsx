import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const NoImageContainer = () => {
    return <Box height="194px">No image available</Box>;
};

const ArtworkItem = ({ artwork }) => {
  const firstImage = artwork.images[0];

  return (
    <Card
      sx={{
        height: "240px",
        minWidth: "150px",
        maxWidth: "180px",
        padding: "12px",
        cursor: "pointer",
      }}
    >
      {!firstImage ? (
        <NoImageContainer />
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={firstImage.url}
          alt="Paella dish"
        />
      )}
      <CardContent>
        <Typography>{artwork.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default ArtworkItem;
