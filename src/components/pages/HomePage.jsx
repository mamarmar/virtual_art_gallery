import { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import NavigationBar from "../modules/NavigationBar";
import Search from "../modules/Search";
import ArtworksGrid from "../modules/ArtworksGrid";
import { useStore } from "../../store/index";

const containerStyle = {
  marginTop: "7em",
  marginBottom: "7em",
};

const HomePage = () => {
  const artworks = useStore((state) => state.artworks);
  // const artists = useStore((state) => state.artists);
  const isLoading = useStore((state) => state.ui.loading);
  const getArtworks = useStore((state) => state.getArtworks);
  // const getArtists = useStore((state) => state.getArtists);

  useEffect(() => {
    // Make API request if no artworks exist in global state
    if (!artworks.length) {
      getArtworks("size=15&classification=Paintings");
    }
    // if (!artists.length) {
    //   getArtists("q=role:Artist")
    // }
  }, []);

  return (
    <>
      <NavigationBar />
      <Box sx={containerStyle}>
        <Search />
        <Box sx={{ marginTop: "3em" }}>
          {artworks.length < 1 && !isLoading && (
            <p className="no-results-message"> No artworks found</p>
          )}
          {artworks.length < 1 && isLoading && <CircularProgress sx={{color:"#535bf2", marginTop:"5em"}}/>}
          {artworks.length > 0 && !isLoading && (
            <ArtworksGrid artworks={artworks} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
