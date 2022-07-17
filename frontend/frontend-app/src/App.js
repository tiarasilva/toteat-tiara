import React, { useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import "./index.css";
import RoutesPath from "./Routes/routes";

// Material UI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    // grey
    primary: {
      main: "#CCCCCC",
    },
    // red
    secondary: {
      main: "#bb151c",
    },
    white: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Montserrat"],
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              La pikada de la esquina
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            <Link
              to={"/info"}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <ListItem button onClick={handleDrawerClose} key="info">
                <ListItemText primary="Toda la información" />
              </ListItem>
            </Link>
            <Link
              to={"/statistics"}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <ListItem button onClick={handleDrawerClose} key="statistics">
                <ListItemText primary="Estadísticas productos" />
              </ListItem>
            </Link>
            <Link
              to={"/payment"}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <ListItem button onClick={handleDrawerClose} key="payment">
                <ListItemText primary="Estadísticas pagos" />
              </ListItem>
            </Link>
            <Link
              to={"/resume"}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <ListItem
                button
                onClick={handleDrawerClose}
                underline="none"
                key="resume"
              >
                <ListItemText primary="Conclusiones" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Box>
      <CssBaseline />
      <RoutesPath />
    </ThemeProvider>
  );
}

export default App;
