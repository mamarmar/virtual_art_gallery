import { useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  AppBar,
  Stack
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/index";
import { supabase } from "../../supabaseClient";

const containerStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems:"center",
  borderBottom: "2.5px solid #F9F9F9",
  padding: "24px",
  backgroundColor: "white",
  zIndex:"100",
};

const NavigationBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const isUser = useStore((state) => state.user.id);
  const updateUserState = useStore((state) => state.logOut);

  const settings = [
    {
      name: "My Collection",
      action: () => {
        navigate("/collection");
        handleCloseUserMenu();
      },
    },
    {
      name: "Logout",
      action: () => {
        logOut();
        handleCloseUserMenu();
      },
    },
  ];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log("ERROR", error);
      } else {
        updateUserState();
        navigate("/");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Box sx={containerStyle}>
      <Typography>Visual Art Gallery</Typography>

      {!isUser && (
        <Stack direction="row" spacing="0.6rem">
            <button className="secondary" onClick={() => navigate("/login")}>
            Log in
            </button>
            <button className="primary" onClick={() => navigate("/signup")}>
            Sign up
            </button>
          {/* <Button variant="outlined" onClick={() => navigate("/login")}>
            Log in
          </Button> */}
          {/* <Button variant="contained" onClick={() => navigate("/signup")}>
            Sign up
          </Button> */}
        </Stack>
      )}
      {isUser && (
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircle />
        </IconButton>
      )}
      <Menu
        sx={{ mt: "25px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={setting.action}>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export default NavigationBar;
