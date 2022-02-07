import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewSection } from "../slices/section-slice";
import { updateEntity } from "../slices/entity-slice";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Board from "../components/Board/Board";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import useDialog from "../hooks/useDialog";
import useToggle from "../hooks/useToggle";
import ContentDialog from "../components/ContentDialog/ContentDialog";
import IconButton from "@mui/material/IconButton";

const EntityPage = (data) => {
  const { open, onToggle } = useDialog();
  const { onToggleChange, value } = useToggle("field");
  const { id } = useParams();

  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: `/edit/entity/${id}`,
    });
  };

  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const entity = useSelector((store) => store.entity.byId[id]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreateSectionClick = useCallback(() => {
    onToggle();
    // We create and add a new section to the list of sections
    const addNewSection = dispatch(
      createNewSection(
        { entityId: entity.id, elementType: value, name: title },
        [
          "id",
          "name",
          "elements: childOrder",
          "elementType",
          `entity {
            id
            name
            defaultFields
            defaultActions
            labels {
              id
              language
              value
            }
            descriptions {
              id
              language
              value
            }
            childOrder
          }`,
        ],
        "update"
      )
    );
    addNewSection.then((entity) => {
      // We add the id of the new section to the list of sectionId of the entity
      dispatch(updateEntity(entity, [], "update"));
    });
  }, [title, dispatch, value, entity, onToggle]);

  return (
    <Box>
      {/* {process.env.REACT_APP_DEV_MODE && (
        <Alert severity="info" style={{ marginTop: 8 }}>
          <code>entity: {JSON.stringify(entity)}</code>
        </Alert>
      )} */}

      <Grid container direction={"row"}>
        <Grid item>
          <Box
            sx={{
              backgroundColor: "#EBECF0",
              margin: 1,
              padding: 1,
              color: "#172B4D",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "30px !important",
                fontWeight: "800 !important",
                paddingBottom: "10px",
              }}
            >
              {!isEmpty(entity) ? entity.name : <Skeleton width="30%" />}
            </Typography>
            <IconButton
              aria-label="edit"
              color="secondary"
              onClick={handleClick}
            >
              <EditIcon />
            </IconButton>
            <Typography sx={{ paddingBottom: "10px" }}>
              {!isEmpty(entity) ? (
                entity.labels[0].value
              ) : (
                // <LinearProgress color="inherit" />
                <Skeleton width="15%" />
              )}
            </Typography>
            <Typography sx={{ width: "300px" }} paragraph>
              {!isEmpty(entity) ? (
                entity.descriptions[0].value
              ) : (
                // entity.descriptions.value
                <Skeleton width="60%" />
              )}
            </Typography>
            <Divider />
            <ToggleButtonGroup
              color="primary"
              value={value}
              exclusive
              onChange={onToggleChange}
            >
              <ToggleButton value="field">Field</ToggleButton>
              <ToggleButton value="action">Action</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item>
          <Board
            entityId={data.match.params.id}
            elementType={value}
            arraySectionsId={!isEmpty(entity) && entity.childOrder}
          />
        </Grid>
      </Grid>

      <Fab
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
        }}
        aria-label={"Add"}
        color={"blue"}
        onClick={onToggle}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={onToggle}>
        <ContentDialog
          dialogTitle="Add new section"
          label="Title"
          value={title}
          onToggle={onToggle}
          onActionClick={handleCreateSectionClick}
          onChange={handleChange}
        />
      </Dialog>
    </Box>
  );
};

export default EntityPage;
