import React, { useState } from "react";
import {
  Box,
  InputBase,
  InputLabel,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { forwardRef, ReactNode } from "react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string | number | unknown;
  type?: string;
  name?: string;
  required?: boolean;
  errorMessage?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  select?: boolean;
  children?: ReactNode; // necessário para <MenuItem>s em caso de select
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      name,
      value,
      required = false,
      onChange,
      errorMessage,
      select = false,
      children,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <Box>
        {select ? (
          <TextField
            select
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            sx={{ paddingTop: "0.3rem" }}
            required={required}
            error={!!errorMessage}
            inputRef={ref}
            variant="standard"
            {...rest}
          >
            {children}
          </TextField>
        ) : (
          <>
            <InputLabel shrink htmlFor={name} required={required}>
              {label}
            </InputLabel>
            <InputBase
              id={name}
              name={name}
              placeholder={placeholder}
              type={type === "password" && !showPassword ? "password" : "text"}
              fullWidth
              inputRef={ref}
              value={String(value)}
              onChange={onChange}
              required={required}
              autoComplete={"off"}
              endAdornment={
                type === "password" && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
              {...rest}
            />
          </>
        )}

        {errorMessage && (
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 0.5, display: "block" }}
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
    );
  }
);

export default FormInput;
