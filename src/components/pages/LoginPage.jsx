import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../elements/Input";
import { LoadingButton } from "@mui/lab";
import { supabase } from "../../supabaseClient";
import NavigationBar from "../modules/NavigationBar";
import { useStore } from "../../store/index";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const isUser = useStore((state) => state.user.id);
  const updateUserState = useStore((state) => state.logIn);

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
        
        // Update global state
        updateUserState({
          id: user.id,
          email: user.email,
          session: {
            accessToken: session.access_token,
            expiresAt: session.expires_at,
          },
        });
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
  },[]);

  return (
    <>
      <NavigationBar />
      <h2>Log in</h2>
      {/* <div> */}
      <form
        onSubmit={handleSubmit(logIn)}
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

export default LoginPage;
