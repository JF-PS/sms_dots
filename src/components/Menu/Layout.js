import React from "react";
import Grid from "@mui/material/Grid";
import NavBar from "./NavBar";
import NavBarDrawer from "./NavBarDrawer";

const Layout = ({ children }) => {
  return (
    <Grid container alignItems="stretch" spacing={1}>
      <Grid item>
        <NavBar />
      </Grid>

      <Grid item>
        <NavBarDrawer />
      </Grid>

      <Grid
        item
        component="main"
        sx={{
          background: "#f9f9f9",
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
          overflowY: "scroll",
          padding: 0.5,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
