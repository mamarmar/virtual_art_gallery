import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Controller, get } from "react-hook-form";
import _ from "lodash";
import VisibilityIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOffIcon from "@mui/icons-material/Visibility";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const inputLabelStyles = {
  fontFamily: "Poppins",
  color: "#BABFBF",
  "&.Mui-focused": {
    color: "#646cff",
  },
};

const rootInputStyles = {
  "&:after": {
    borderBottom: "2px solid #646cff",
  },
};

const inputStyles = {
  fontFamily: "Poppins",
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
  setValue,
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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getEndAdornment = (value) => {
    if (type === "password") {
      return (
        <InputAdornment position="end" disablePointerEvents={disabled}>
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggleShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            sx={{
              padding: "16px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            disabled={disabled}
          >
            {showPassword ? (
              <VisibilityOffIcon sx={{ size: "16px", color: "#5E54FF" }} />
            ) : (
              <VisibilityIcon size={"16px"} color="#5E54FF" />
            )}
          </IconButton>
        </InputAdornment>
      );
    } else if(type === "text" && value) {
      return (
        <InputAdornment position="end" disablePointerEvents={disabled}>
          <IconButton
            aria-label="clear field"
            onClick={()=> setValue(name, "")}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            sx={{
              padding: "16px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            disabled={disabled}
          >
            <HighlightOffIcon size={"16px"} color="#5E54FF" />
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
        render={({ fieldState, field: { onChange, value } }) => (
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
              flex: 1,
              ...customRootStyles,
            }}
            InputLabelProps={{
              sx: {
                ...inputLabelStyles,
              },
            }}
            InputProps={{
              endAdornment: getEndAdornment(value),
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
