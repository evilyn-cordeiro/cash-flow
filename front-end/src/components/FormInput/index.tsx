import React from "react";
import { Box, InputBase, InputLabel, Typography } from "@mui/material";
import { forwardRef } from "react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string | number | unknown;
  type?: string;
  name?: string;
  required?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      ...rest
    },
    ref
  ) => {
    return (
      <Box>
        <InputLabel shrink htmlFor={name} required={required}>
          {label}
        </InputLabel>
        <InputBase
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          fullWidth
          inputRef={ref}
          value={String(value)}
          onChange={onChange}
          required={required}
          autoComplete={"off"}
          {...rest}
        />
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
