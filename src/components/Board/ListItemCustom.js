import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import React, { useEffect } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ItemField from "./Item/ItemField";
import ItemAction from "./Item/ItemAction";

import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const ListItemCustom = ({
  itemObject,
  index,
  entityId,
  sectionId,
  elementType,
}) => {
  const entity = useSelector((store) => store.entity.byId[entityId]);

  // useEffect(() => {
  //   console.log(entity);
  // }, [entity]);

  return (
    <>
      {itemObject ? (
        <Draggable
          draggableId={itemObject.id}
          key={itemObject.id}
          index={index}
          sx={{ width: "500px" }}
        >
          {(provided) => (
            <ListItem
              key={itemObject.id}
              role={undefined}
              dense
              button
              ContainerComponent="li"
              ContainerProps={{ ref: provided.innerRef }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {elementType === "field" && (
                <ItemField
                  fieldId={itemObject.value}
                  entityId={entityId}
                  sectionId={sectionId}
                  isChecked={
                    !isEmpty(entity) &&
                    entity.defaultFields.includes(`${itemObject.value}`)
                  }
                />
              )}
              {elementType === "action" && (
                <ItemAction
                  entityId={entityId}
                  actionId={itemObject.value}
                  sectionId={sectionId}
                  isChecked={
                    !isEmpty(entity) &&
                    entity.defaultActions.includes(`${itemObject.value}`)
                  }
                />
              )}

              <ListItemSecondaryAction />
            </ListItem>
          )}
        </Draggable>
      ) : (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Stack>
      )}
    </>
  );
};

export default ListItemCustom;
