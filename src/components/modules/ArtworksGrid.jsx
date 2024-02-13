import ArtworkItem from "./ArtworkItem";
import { Box, Grid } from "@mui/material";

const ArtworksGrid = ({ artworks }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
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
