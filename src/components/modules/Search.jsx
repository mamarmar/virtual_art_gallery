import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Stack, Button } from "@mui/material";
import Input from "../elements/Input";
import { useStore } from "../../store/index";

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
    <form onSubmit={handleSubmit(searchArtworksByTitle)}>
      <Stack direction="row" spacing={2}>
        <Input
          name="artworkTitle"
          type="text"
          errors={errors}
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
        <LoadingButton
          color="primary"
          variant="contained"
          type="submit"
          loading={isSubmitting}
          disabled={!watchArtworkTitle && !watchArtist}
        >
          Submit
        </LoadingButton>
        <Button
          color="primary"
          variant="contained"
          type="button"
          disabled={isSubmitting}
          onClick={clearSearch}
        >
          Clear
        </Button>
      </Stack>
    </form>
  );
};

export default Search;
