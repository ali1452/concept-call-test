import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CottageIcon from '@mui/icons-material/Cottage';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";

import { UserContext } from "../App";
import { Stack } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigation = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const signUserOut =()=> signOut(auth).then(()=>{
    localStorage.clear();
    setIsLoggedIn(false);
    navigation("/");


  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => {
              navigation("dashboard/projects/all");
            }}
            variant="h6"
            noWrap
            component="div"
            data-testid="header"
          >
            ConceptCall
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {<Stack>
            <CottageIcon sx={{marginRight:10, fontSize:"50px"}} color="primary" />
            </Stack>}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem
            onClick={() => {
              navigation("users");
              handleDrawerClose();
            }}
            button
          >
            Users
          </ListItem>
          <Divider></Divider>
          <ListItem
            onClick={() => {
              navigation("firebase");
              handleDrawerClose();
            }}
            button
          >
            firebaseList
          </ListItem>
          <Divider></Divider>

          <ListItem
            onClick={() => {
              navigation("/search");
              handleDrawerClose();
            }}
            button
          >
            Search Users
          </ListItem>
          <Divider></Divider>

          <ListItem
            onClick={() => {
              navigation("/createproject");
              handleDrawerClose();
            }}
            button
          >
            Create Project
          </ListItem>
          <Divider></Divider>

          <ListItem
            onClick={() => {
              navigation("dashboard/projects/all");
              handleDrawerClose();
            }}
            button
          >
            All Projects
          </ListItem>
          <Divider></Divider>

          <ListItem
            onClick={() => {
              navigation("dashboard/projects/completed");
              handleDrawerClose();
            }}
            button
          >
            Complete Projects
          </ListItem>
          <Divider></Divider>

          <ListItem
            onClick={() => {
              navigation("dashboard/projects/archive");
              handleDrawerClose();
            }}
            button
          >
            Archive Projects
          </ListItem>
          <Divider></Divider>

          <ListItem
            onClick={() => {
              navigation("products");
              handleDrawerClose();
            }}
            button
          >
            Products
          </ListItem>
          <Divider></Divider>

   
          <ListItem
            onClick={() => {
              signUserOut();
              // handleDrawerClose();
            

            }}
            button
          >
            Log out
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph></Typography>
      </Main>
    </Box>
  );
}
