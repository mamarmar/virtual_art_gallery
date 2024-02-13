import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Button } from "@mui/material";
import Input from "../elements/Input";
import { useStore } from "../../store/index";

const containerStyle = {
  maxWidth: "560px",
  minWidth: "400px"
};

const Search = () => {
  const getArtworks = useStore((state) => state.getArtworks);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchArtworkTitle = watch("artworkTitle");
  const watchArtist = watch("artistName");

  const searchArtworksByTitle = (values, event) => {
    event.preventDefault();
    const { artworkTitle, artistName } = values;
    if (!artistName) {
      getArtworks(`title="${artworkTitle}"&classification=Paintings`);
    } else if (!artworkTitle) {
      getArtworks("person=34191&classification=Paintings");
      //   getArtworks(`artist="${artistName}"&classification=Paintings`);
    }
  };

  const clearSearch = () => {
    setValue("artworkTitle", "");
    setValue("artistName", "");
    getArtworks("size=15&classification=Paintings");
  };

  return (
    <Box sx={containerStyle}>
      <form onSubmit={handleSubmit(searchArtworksByTitle)}>
        <Stack direction="row" spacing={2}>
          <Input
            name="artworkTitle"
            type="text"
            errors={errors}
            setValue={setValue}
            placeholder="Search artworks by title"
            control={control}
          />
          {/* <Input
          name="artistName"
          type="text"
          errors={errors}
          placeholder="Search artworks by artist"
          control={control}
        /> */}
          <button
            type="submit"
            className={`primary ${isSubmitting ? "button--loading" : ""}`}
            disabled={!watchArtworkTitle && !watchArtist}
          >
            Search
          </button>
          <button
            type="button"
            className={`secondary ${isSubmitting ? "button--loading" : ""}`}
            disabled={isSubmitting}
            onClick={clearSearch}
          >
            Clear
          </button>
        </Stack>
      </form>
    </Box>
  );
};

export default Search;
