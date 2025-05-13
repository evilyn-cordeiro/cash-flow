import React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AvatarHeader = ({ name = "Usuário" }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleClose();
    navigate("/login");
  };

  return (
    <Box display="flex" alignItems="center" gap={1} justifyContent={"center"}>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar alt={name} variant="circular" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarHeader;
