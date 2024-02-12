import axios from "axios";

export const fetchArtworks = async (params) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HARVARD_MUSEUMS_API}/object?${params}&apikey=${
        import.meta.env.VITE_HARVARD_MUSEUMS_API_KEY
      }`
    );
    const {
      data: { info, records },
    } = response;

    // Keep only the artwork information needed
    const receivedArtworks = records.map((artwork) => {
      // Find the artist if they exist
      let artist = null;
      if (artwork.peoplecount) {
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

      // Find the images if they exist
      let images = [];
      if (artwork.imagecount) {
        images = artwork.images.map((image) => ({
          url: image.baseimageurl,
          format: image.format,
          copyright: image.copyright,
          altText: image.alttext,
          height: image.height,
        }));
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
        images,
      };
    });

    return receivedArtworks;
  } catch (error) {
    console.log("ERROR", error);
  }
};
