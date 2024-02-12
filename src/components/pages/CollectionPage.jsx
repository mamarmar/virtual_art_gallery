import NavigationBar from "../modules/NavigationBar";
import ArtworksGrid from "../modules/ArtworksGrid";
import { useStore } from "../../store/index";

const CollectionPage = () => {
  const collection = useStore((state) => state.collection);
  const savedArtworks = collection.artworks;
  return (
    <>
      <NavigationBar />
      Collection Page
      {!savedArtworks.length && "You have no artworks saved to your collection"}
      {savedArtworks.length && <ArtworksGrid artworks={savedArtworks} />}
    </>
  );
};

export default CollectionPage;
