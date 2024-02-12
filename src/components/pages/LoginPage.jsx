import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../elements/Input";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { supabase } from "../../supabaseClient";
import NavigationBar from "../modules/NavigationBar";
import { useStore } from "../../store/index";
import { getCollection } from "../../utils/apiUtils";

const containerStyle = {
  minWidth: "400px",
  marginTop: "10em",
};

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const isUser = useStore((state) => state.user.id);
  const updateUserState = useStore((state) => state.logIn);
  const updateCollectionState = useStore((state) => state.getCollection);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const logIn = async (values, event) => {
    event.preventDefault();
    const { email, password } = values;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        const { user, session } = data;

        //  Get user's collection
        const collection = await getCollection(user.id);

        // Update global state
        updateUserState({
          id: user.id,
          email: user.email,
          session: {
            accessToken: session.access_token,
            expiresAt: session.expires_at,
          },
        });
        updateCollectionState(collection);
        navigate("/");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (isUser) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <Box sx={containerStyle}>
        <h2>Welcome Back</h2>
        <form
          onSubmit={handleSubmit(logIn)}
          style={{ display: "flex", flexDirection: "column" }}
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
          <button
            type="submit"
            className={`primary ${isSubmitting ? "button--loading" : ""}`}
            disabled={isSubmitting}
          >
            Submit
          </button>
          {/* <LoadingButton
            color="secondary"
            variant="contained"
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton> */}
        </form>
      </Box>
    </>
  );
};

export default LoginPage;
