import { useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import NavigationBar from "../modules/NavigationBar";
import Search from "../modules/Search";
import ArtworksGrid from "../modules/ArtworksGrid";
import { useStore } from "../../store/index";

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
      Homepage
      <Search />
      {!artworks.length && !isLoading && (
        <Typography> No artworks found</Typography>
      )}
      {!artworks.length && isLoading && <CircularProgress />}
      {artworks.length && !isLoading && <ArtworksGrid artworks={artworks} />}
    </>
  );
};

export default HomePage;
