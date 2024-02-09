import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/index";
import { supabase } from "../../supabaseClient";

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
    <Box
      sx={{
        height: "40px",
        borderBottom: "1px solid grey",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>Visual Art Gallery</Typography>

      <Box sx={{ flexGrow: 0 }}>
        {!isUser && (
          <Box sx={{ display: "flex" }}>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </Box>
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
    </Box>
  );
};
export default NavigationBar;
