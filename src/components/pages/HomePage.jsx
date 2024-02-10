import { useEffect } from "react";
import axios from "axios";
import NavigationBar from "../modules/NavigationBar";
import { useStore } from "../../store/index";

const HomePage = () => {
  const artworks = useStore((state) => state.artworks);
  const updateArtworksState = useStore((state) => state.getArtworks);

  const getArtworks = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_HARVARD_MUSEUMS_API
        }/object?size=15&classification=Paintings&apikey=${
          import.meta.env.VITE_HARVARD_MUSEUMS_API_KEY
        }`
      );
      const {
        data: { info, records },
      } = response;

      // Keep only the artwork information we want
      const receivedArtworks = records.map((artwork) => {
        // Find the artist if they exist
        let artist;
        if (!artwork.peoplecount) {
          artist = null;
        } else {
          const existingArtist = artwork.people.find(
            (person) => person.role === "Artist"
          );
          artist = {
            id: existingArtist.personid,
            name: existingArtist.name,
            date: existingArtist.displaydate,
            gender: existingArtist.gender,
          };
        }
        return {
          id: artwork.id,
          title: artwork.title,
          artist,
          year:
            artwork.datebegin === artwork.dateend
              ? artwork.datebegin
              : `${artwork.datebegin}-${artwork.dateend}`,
          culture: artwork.culture,
          medium: artwork.medium,
          division: artwork.division,
          images: artwork.images.map((image) => ({
            baseimageurl: image.baseimageurl,
            format: image.format,
            copyright: image.copyright,
          })),
        };
      });

      //Update global state
      updateArtworksState(receivedArtworks);

      return;
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    // Make API request if no artworks exist in global state
    if (!artworks.length) {
      getArtworks();
    }
  }, []);

  return (
    <>
      <NavigationBar />
      Homepage
    </>
  );
};

export default HomePage;
