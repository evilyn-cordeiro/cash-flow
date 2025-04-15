import React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";

const AvatarHeader = ({ name = "Usuário" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <Box display="flex" alignItems="center" gap={1} justifyContent={"center"}>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar alt={name} variant="rounded" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Sair</MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarHeader;
