import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  AppBar,
  Stack,
  Toolbar,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/index";
import { supabase } from "../../supabaseClient";

const containerStyle = {
  boxShadow: "none",
  borderBottom: "2.5px solid #F9F9F9",
  backgroundColor: "white",
};

const profileButtonStyle = {
  color: "black",
  padding: 0,
  "&:focus": {
    outline: "none",
    backgroundColor: "transparent",
  },
  "&:hover": {
    backgroundColor: "white",
  },
};

const menuStyle = {
  mt: "3em",
  position: "absolute",
  right: "1.5em",
  "& .MuiList-root": {
    padding: 0,
  },
};

const menuItemStyle = {
  fontFamily: "Poppins",
  padding: "8px",
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={containerStyle}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <p className="logo" onClick={() => navigate("/")}>
            Visual Art Gallery
          </p>

          {!isUser && (
            <Stack direction="row" spacing="0.6rem">
              <button className="secondary" onClick={() => navigate("/login")}>
                Log in
              </button>
              <button className="primary" onClick={() => navigate("/signup")}>
                Sign up
              </button>
            </Stack>
          )}
          {isUser && (
            <IconButton onClick={handleOpenUserMenu} sx={profileButtonStyle}>
              <AccountCircle sx={{ fontSize: "1.5em" }} />
            </IconButton>
          )}
          <Menu
            sx={menuStyle}
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
                <Typography textAlign="center" sx={menuItemStyle}>
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavigationBar;
