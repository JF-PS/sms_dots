import React, { useCallback, useEffect, useState } from "react";
import {
  getTreeStucture,
  updateWithTreeStructure,
} from "../../slices/entity-slice";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";

import { pushNavHistory, deleteNavHistory } from "../../slices/app-slice";
import { useSelector, useDispatch } from "../../store/store";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useDrawerConnected from "../../hooks/use-drawer-connected";

const appSelector = (store) => store.app;

export default function NavBarDrawer() {
  const { navHistoryIds } = useSelector(appSelector);
  const { open } = useDrawerConnected();

  const [childrens, setChildrens] = useState([]);
  const [parent, setParent] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  const getTreeEntities = useCallback(
    (id) => {
      return dispatch(
        getTreeStucture(
          { id },
          [
            "id",
            "name",
            `children{
                id
                name
                children{
                  id
                }
              }`,
          ],
          "get"
        )
      ).then((entities) => {
        const { parent, treeStructure } = entities;
        setChildrens(treeStructure);
        setParent(parent);
        return entities;
      });
    },
    [dispatch]
  );

  const handleGoForwardClick = (entityId) => () => {
    dispatch(pushNavHistory(parseInt(entityId)));
  };

  const handleGoBackClick = (entityId) => () => {
    dispatch(deleteNavHistory(parseInt(entityId)));
  };

  const handleViewEntityClick = (entityId) => () => {
    history.push({
      pathname: `/entities/${entityId}`,
    });
  };

  useEffect(() => {
    if (isEmpty(navHistoryIds)) dispatch(pushNavHistory(398));
    else getTreeEntities(navHistoryIds[navHistoryIds.length - 1]);
  }, [navHistoryIds, getTreeEntities, dispatch]);

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
        {!isEmpty(navHistoryIds) && navHistoryIds.length > 1 && (
          <ArrowBackIcon onClick={handleGoBackClick(parent.id)} />
        )}
        {parent.name}
      </Typography>

      <Divider />

      <List>
        {!isEmpty(childrens) ? (
          childrens.map((structure, index) => (
            <ListItem sx={{ p: 0 }} button key={index}>
              <ListItemText
                sx={{
                  p: 1,
                  backgroundColor: "#EFEFEF",
                }}
                onClick={handleViewEntityClick(structure.id)}
                primary={
                  structure.name.length > 15
                    ? `${structure.name.substr(0, 15)}...`
                    : structure.name
                }
              />
              {!isEmpty(structure.children) && (
                <ListItemIcon
                  sx={{
                    p: 1,
                    backgroundColor: "#CECECE",
                  }}
                  onClick={handleGoForwardClick(structure.id)}
                >
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              )}
            </ListItem>
          ))
        ) : (
          <Typography sx={{ fontWeight: "bold", mt: 5 }}>
            No childrens found for entity {parent.name}
          </Typography>
        )}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: open ? "block" : "none",
        borderRadius: "0px 20px 0px 0px",
        borderRight: "solid 1px #B5B5B5",
        height: "100%",
      }}
    >
      {list()}
    </Box>
  );
}
