import ArtworkItem from "./ArtworkItem";
import { Box, Grid } from "@mui/material";

const ArtworksGrid = ({ artworks }) => {
  console.log("ARTWORK_GRID", artworks);
  return (
    <Box sx={{ flexGrow: 1, marginTop:"48px" }}>
      <Grid container spacing={2}>
        {artworks.map((artwork) => {
          return (
            <Grid item key={artwork.id}>
                <ArtworkItem artwork={artwork} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ArtworksGrid;
