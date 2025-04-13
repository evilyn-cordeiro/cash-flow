import React from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

const AvatarHeader = ({ name = "Usuário", role = "Administrador" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <Box display="flex" alignItems="center" gap={1} justifyContent={"center"}>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar alt={name} />
      </IconButton>

      <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
        <Typography
          variant="body1"
          color="inherit"
          fontWeight="bold"
          sx={{ lineHeight: "1rem" }}
        >
          {name}
        </Typography>
        <Typography variant="caption" color="inherit">
          {role}
        </Typography>
      </Box>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Sair</MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarHeader;
