import React, { useState, forwardRef, ReactNode } from "react";
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

interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string | number | unknown;
  type?: string;
  name?: string;
  required?: boolean;
  errorMessage?: string;
  maxLength?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  select?: boolean;
  children?: ReactNode;
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
      maxLength,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    // Tratamento especial para type="number"
    const isPassword = type === "password";
    const isNumber = type === "number";

    const resolvedType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : isNumber
      ? "text" // para permitir maxLength
      : type;

    const inputMode = isNumber ? "numeric" : undefined;
    const pattern = isNumber ? "[0-9]*" : undefined;

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
              type={resolvedType}
              inputMode={inputMode}
              fullWidth
              inputRef={ref}
              value={String(value)}
              onChange={onChange}
              required={required}
              autoComplete="off"
              inputProps={{
                maxLength: maxLength ?? undefined,
                pattern: pattern,
              }}
              endAdornment={
                isPassword && (
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
