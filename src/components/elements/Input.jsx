import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormLabel,
} from "@mui/material";
import { Eye, EyeOff, XCircle } from "feather-icons";
import { Controller, get } from "react-hook-form";
import _ from "lodash";


const inputLabelStyles = {
color: "#646cff",
  "&.Mui-focused": {
    color: "#646cff",
  },
};

const rootInputStyles = {

  "&:after": {
    borderBottom: "2px solid #646cff",
  },

  "&.Mui-focused": {
    backgroundColor: "#f9f9f9",
  },
};

const inputStyles = {
  padding: "12px 6px",
  "&:hover": {
    cursor: "pointer",
  },
  "&:disabled": {
    cursor: "not-allowed",
  },
  
};

const Input = ({
  name,
  type,
  errors,
  label,
  placeholder,
  required,
  control,
  textIcon,
  disabled,
  isRequired,
  errorMessage,
  customRootStyles,
  customRootInputStyles,
  customInputStyles,
  setValue,
  suffix,
  suffixStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getEndAdornment = () => {
    console.log("IN HEREEEE");
    if (type === "password") {
      return (
        <InputAdornment position="end" disablePointerEvents={disabled}>
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            sx={{ padding: "16px" }}
            disabled={disabled}
          >
            {showPassword ? (
              <Eye size={"16px"} color="#5E54FF" />
            ) : (
              <Eye size={"16px"} color="#5E54FF" />
            )}
          </IconButton>
        </InputAdornment>
      );
    } else {
      return (
        <InputAdornment position="end" disablePointerEvents={disabled}>
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            sx={{ padding: "16px" }}
            disabled={disabled}
          >
            <X-Circle size={"16px"} color="#5E54FF" />
          </IconButton>
        </InputAdornment>
      );
    }
  };

  const helperTextStyle = {
    "&.Mui-error": {
      color: "red",
    },
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: { value: isRequired, message: errorMessage },
        }}
        render={({
          fieldState: { invalid, isTouched, isDirty, error },
          field: { onChange, value },
        }) => (
          <TextField
            type={type === "password" && showPassword ? "text" : type}
            onChange={onChange}
            value={value || ""}
            placeholder={placeholder}
            label={label}
            error={get(errors, name)}
            disabled={disabled}
            helperText={_.get(errors, name) ? _.get(errors, name).message : ""}
            FormHelperTextProps={{
              sx: {
                ...helperTextStyle,
              },
            }}
            variant="standard"
            sx={{
              flex:1
              // ...rootStyles,
              // ...customRootStyles,
            }}
            InputLabelProps={{
              sx: {
                ...inputLabelStyles,
              },
            }}
            InputProps={{
              // endAdornment: getEndAdornment(),
              sx: {
                ...rootInputStyles,
                ...customRootInputStyles,
              },
            }}
            inputProps={{
              sx: {
                ...inputStyles,
                ...customInputStyles,
              },
            }}

            {...props}
          />
        )}
      />
    </>
  );
};

export default Input;
