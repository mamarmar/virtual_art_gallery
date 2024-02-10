import { Typography, Box, Card, CardContent, CardMedia } from "@mui/material";

const NoImageContainer = () => {
  return <Box height="240px">No image</Box>;
};

const ArtworkItem = ({ artwork }) => {
  const firstImage = artwork.images[0];

  return (
    <Card sx={{ height: "240px", padding: "12px", cursor: "pointer" }}>
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
