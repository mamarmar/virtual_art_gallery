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

const rootStyles = {
  backgroundColor: "white",
};

const inputLabelStyles = {
  fontSize: "14px",
  lineHeight: "18px",
  fontFamily: "Inter",
  color: "#55535A",
  paddingBottom: "3px",
  "& .MuiFormLabel-asterisk": {
    color: "##5E54FF",
  },
};

const rootInputStyles = {
  disableUnderline: true,
  "&:hover": {
    backgroundColor: "#F3F4FF",
    borderBottom: "2px solid #C8CEFF",
  },

  "&:focus": {
    background: "#F3F4FF",
    color: "#2B2A2E",
    borderBottom: "2px solid #5E54FF",
  },
  "&:before": {
    content: "none",
  },

  "&:after": {
    borderBottom: "2px solid #5E54FF",
  },

  "&.Mui-focused": {
    borderBottom: "none",
    backgroundColor: "#F3F4FF",
  },

  "&.Mui-error": {
    backgroundColor: "#FFDFDA",
    borderBottom: "1px solid red",
  },
};

const inputStyles = {
  fontFamily: "Inter",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: 400,
  color: "#000000",
  padding: "13px 8px",
  border: "none",
  "&:hover": {
    cursor: "pointer",
  },
  "&:disabled": {
    cursor: "not-allowed",
  },
  "&[type=number]": {
    "-moz-appearance": "textfield",
  },
  "&::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&::placeholder": {
    color: "#6A6870",
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
  const [hover, setHover] = useState(false);

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
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
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
            // InputLabelProps={{
            //   sx: {
            //     ...inputLabelStyles,
            //   },
            // }}
            InputProps={{
              // endAdornment: getEndAdornment(),
              // sx: {
              //   ...rootInputStyles,
              //   ...customRootInputStyles,
              // },
            }}
            // inputProps={{
            //   sx: {
            //     ...inputStyles,
            //     ...customInputStyles,
            //   },
            // }}

            {...props}
          />
        )}
      />
    </>
  );
};

export default Input;
