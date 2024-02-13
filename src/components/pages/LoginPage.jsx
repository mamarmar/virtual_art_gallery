import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../elements/Input";
import { Box } from "@mui/material";
import { supabase } from "../../supabaseClient";
import NavigationBar from "../modules/NavigationBar";
import { useStore } from "../../store/index";
import { getCollection } from "../../utils/apiUtils";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10em",
};

const formContainerStyle = {
  width: "360px",
  padding: "56px 32px",
  background: "white",
  borderRadius: "12px",
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
    setValue,
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
        <Box sx={formContainerStyle}>
          <p className="form-header">Welcome Back</p>
          <form
            onSubmit={handleSubmit(logIn)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Input
              name="email"
              type="text"
              errors={errors}
              setValue={setValue}
              label="Email"
              control={control}
              customRootStyles={{ marginBottom: "16px" }}
            />
            <Input
              name="password"
              type="password"
              errors={errors}
              setValue={setValue}
              label="Password"
              control={control}
            />
            <p className="error-message">{errorMessage}</p>
            <button
              type="submit"
              className={`primary ${isSubmitting ? "button--loading" : ""}`}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
