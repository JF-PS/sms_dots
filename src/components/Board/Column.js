import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { getItemSection } from "../../slices/section-slice";
import { updateName, deleteSection } from "../../slices/section-slice";
import { updateEntity } from "../../slices/entity-slice";
import { addFields } from "../../slices/field-slice";
import { addActions } from "../../slices/action-slice";
import { isEmpty } from "lodash";

import List from "@mui/material/List";
import ListItemCustom from "./ListItemCustom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Column = ({ column }) => {
  const section = useSelector((store) => store.section.byId[column.id]);
  const [columnName, setColumnName] = useState(section && section.name);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const items = dispatch(getItemSection(column.id));
    items.then((response) => {
      if (response.elementType === "field")
        dispatch(addFields({ fields: response.elements }, [], "push"));
      else dispatch(addActions({ actions: response.elements }, [], "push"));
    });
  }, [column, dispatch]);

  const handleEditionClick = () => {
    setOpen(true);
  };

  const handleUpdateSectionClick = useCallback(() => {
    setOpen(false);
    dispatch(
      updateName(
        { id: column.id, name: columnName },
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
  }, [dispatch, columnName, column]);

  const handleRemoveClick = () => {
    //We remove the section from the list of sections
    const removeSection = dispatch(deleteSection(column.id));
    removeSection.then((entity) => {
      //We remove the section id from the list of idSection of the entity.
      dispatch(updateEntity(entity, [], "update"));
    });
  };

  const handleColumnNameChange = (event) => {
    setColumnName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {column && column.list ? (
        <Box
          sx={{
            backgroundColor: "#EBECF0",
            margin: 1,
            padding: 1,
            color: "#172B4D",
            borderRadius: 2,

            "&:hover > div > div": {
              visibility: "visible",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              [{column.id}] {columnName}
            </Typography>

            {section &&
              section.name !== "fieldsRootSection" &&
              section.name !== "actionsRootSection" && (
                <Box
                  sx={{
                    visibility: "hidden",
                    textAlign: "right",
                  }}
                >
                  <IconButton
                    aria-label="edit"
                    color="secondary"
                    onClick={handleEditionClick}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={handleRemoveClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
          </Stack>

          <Droppable droppableId={column.id}>
            {(provided) => (
              <List ref={provided.innerRef}>
                {column &&
                  column.list &&
                  !isEmpty(column.list) &&
                  section &&
                  column.list.map((itemObject, index) => {
                    return (
                      <ListItemCustom
                        sectionId={section.id}
                        elementType={section.elementType}
                        index={index}
                        itemObject={itemObject}
                        key={index}
                        entityId={section.entityId}
                      />
                    );
                  })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new section</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="email"
                value={columnName}
                onChange={handleColumnNameChange}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdateSectionClick}>Update</Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
      )}
    </>
  );
};

export default Column;
