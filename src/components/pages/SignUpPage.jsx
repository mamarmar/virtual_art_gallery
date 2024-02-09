import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../elements/Input";
import { LoadingButton } from "@mui/lab";
import { supabase } from "../../supabaseClient";

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const signUp = async (values, event) => {
    event.preventDefault();
    const { email, password } = values;
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setErrorMessage(error.message);
      } else {
        // Update global state
        console.log("DATA", data);
        navigate("/");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <>
      <h2>Sign up</h2>
      {/* <div> */}
      <form
        onSubmit={handleSubmit(signUp)}
        style={{ display: "flex", flexDirection: "column", minWidth: 300 }}
      >
        <Input
          name="email"
          type="text"
          errors={errors}
          label="Email"
          control={control}
        />
        <Input
          name="password"
          type="password"
          errors={errors}
          label="Password"
          control={control}
        />
        <p>{errorMessage}</p>
        <LoadingButton
          color="secondary"
          variant="contained"
          type="submit"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </form>
      {/* </div> */}
    </>
  );
};

export default SignUpPage;
