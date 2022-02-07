import React, { useCallback, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone";
import logo from "../../assets/images/logo.png";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import useDrawerConnected from "../../hooks/use-drawer-connected";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const menuItems = [
  {
    text: "Entities",
    path: "entities",
    icon: <ListAltTwoToneIcon />,
    active: true,
  },
  {
    text: "Fields",
    path: "fields",
    icon: <PlaylistAddCircleTwoToneIcon />,
    active: false,
  },
  {
    text: "Actions",
    path: "actions",
    icon: <PlaylistAddCircleTwoToneIcon />,
    active: false,
  },
  {
    text: "Enums",
    path: "enums",
    icon: <ListAltTwoToneIcon />,
    active: true,
  },
  {
    text: "EnumMembers",
    path: "enumMembers",
    icon: <PlaylistAddCircleTwoToneIcon />,
    active: false,
  },
];

const NavBar = () => {
  const history = useHistory();
  const { open, onOpen, onClose } = useDrawerConnected();

  const handleToggleTreeStructure = useCallback(() => {
    if (open) onClose();
    else onOpen();
  }, [open, onOpen, onClose]);

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <>
      <Box
        component="nav"
        sx={{
          borderRight: "solid 1px #B5B5B5",
          borderRadius: "0px 20px 0px 0px",
          height: "100%",
        }}
      >
        <Stack spacing={2} direction="row">
          <Typography
            variant="h5"
            sx={{
              padding: 2,
            }}
          >
            <img
              style={{ width: "30px" }}
              src={logo}
              alt="logo"
              loading="lazy"
            />
          </Typography>
        </Stack>

        <List>
          <ListItem
            button
            onClick={handleToggleTreeStructure}
            sx={{ margin: "30px 0" }}
          >
            <AccountTreeIcon />
          </ListItem>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={`listKey${index}`}
              onClick={() => history.push(`/${item.path}`)}
              sx={{ margin: "30px 0" }}
            >
              {item.icon}
            </ListItem>
          ))}

          <ListItem button sx={{ margin: "30px 0" }}>
            <FlagTwoToneIcon />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default NavBar;
