import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar({
  Drawer,
  DrawerHeader,
  handleDrawerClose,
  open,
  theme,
  changeComponent,
  logout,
}) {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader sx={{ backgroundColor: "#22577E" }}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            fontWeight: "700",
            width: "100%",
            textAlign: "center",
            color: "#fff",
          }}
        >
          Nazranaa
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon
              sx={{
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#004e4d",
              }}
            />
          ) : (
            <ChevronLeftIcon
              sx={{
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#004e4d",
              }}
            />
          )}
        </IconButton>
      </DrawerHeader>
      <Box
        sx={{
          width: open ? 250 : 55,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List>
          {["Add", "View"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => changeComponent(text)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? (
                  <AddIcon sx={{ color: "#1b1a17" }} />
                ) : (
                  <VisibilityIcon sx={{ color: "#1b1a17" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                sx={{ color: "#1b1a17", opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
        <List>
          {["Logout"].map((text, index) => (
            <ListItemButton
              key={text}
              onClick={logout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? (
                  <LogoutIcon sx={{ color: "#1b1a17" }} />
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                sx={{
                  color: "#1b1a17",
                  opacity: open ? 1 : 0,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
