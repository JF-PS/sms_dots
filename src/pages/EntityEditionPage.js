import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "../store/store";
import { getEntity, updateEntitiesInfo } from "../slices/entity-slice";
import { useParams } from "react-router";
import { isEmpty, cloneDeep } from "lodash";
import {
  getLocalizable,
  updateLocalizables,
} from "../slices/localizable-slice";

import Box from "@mui/material/Box";
import SystemUpdateAltSharpIcon from "@mui/icons-material/SystemUpdateAltSharp";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const localizableSelector = (store) => store.localizable;
const languageSelector = (store) => store.language;
const entitiySelector = (store) => store.entity;

const EntityEditionPage = () => {
  const [localizablesChange, setLocalizablesChange] = useState({});
  const { byId: localizables } = useSelector(localizableSelector);
  const { byId: languages } = useSelector(languageSelector);
  const { byId: entities } = useSelector(entitiySelector);
  const { id } = useParams();
  const entity = useMemo(
    () => (isEmpty(entities) ? {} : entities[parseInt(id)]),
    [entities, id]
  );
  const { name = "", labels = [], descriptions = [] } = entity;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    const language = localizables[id].language;
    setLocalizablesChange((current) => {
      const updateCurrent = cloneDeep(current);
      updateCurrent[id] = { id, value, language };
      return updateCurrent;
    });
  };

  const handleUpdateClick = useCallback(() => {
    dispatch(updateLocalizables(localizablesChange));
  }, [localizablesChange, dispatch]);

  useEffect(() => {
    dispatch(
      getEntity(
        { id },
        [
          "id",
          "name",
          "defaultFields",
          "defaultActions",
          "labels { id language value }",
          "descriptions { id language value }",
          "childOrder",
        ],
        "update"
      )
    ).then((response) => {
      const { labels, descriptions } = response;
      dispatch(getLocalizable({ labels, descriptions }));
    });
  }, [id, dispatch]);

  return (
    <Box>
      {/* {process.env.REACT_APP_DEV_MODE && (
        <Alert severity="info" style={{ marginTop: 8 }}>
          <code>localizables: {JSON.stringify(localizables)}</code>
        </Alert>
      )} */}

      <Divider sx={{ mt: 1, mb: 4 }} />

      <Typography variant="h1" component="h1">
        {name}
      </Typography>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Typography variant="h4" component="h4">
        Labels :
      </Typography>

      {!isEmpty(labels) &&
        !isEmpty(localizables) &&
        labels.map((label, index) => (
          <Stack key={index} spacing={2} sx={{ mt: 4 }} direction="row">
            <img
              key={`img${index}`}
              src={languages[label.language]}
              style={{ width: "8%", height: "60px" }}
              alt={"flagEs"}
            />
            <TextField
              key={`label${index}`}
              id={label.id}
              label={`label ${localizables[label.id].language}`}
              name="labels"
              multiline
              variant="outlined"
              sx={{ width: "70%" }}
              onChange={handleChange}
              defaultValue={localizables[label.id].value}
            />
          </Stack>
        ))}

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Typography variant="h4" component="h4">
        Descriptions :
      </Typography>

      {!isEmpty(descriptions) &&
        !isEmpty(localizables) &&
        descriptions.map((description, index) => (
          <Stack key={index} spacing={2} sx={{ mt: 4 }} direction="row">
            <img
              key={`img${index}`}
              src={languages[description.language]}
              style={{ width: "8%", height: "60px" }}
              alt={"flagEs"}
            />
            <TextField
              key={`description${index}`}
              id={description.id}
              label={`description ${localizables[description.id].language}`}
              multiline
              name="descriptions"
              variant="outlined"
              sx={{ width: "70%" }}
              onChange={handleChange}
              defaultValue={localizables[description.id].value}
            />
          </Stack>
        ))}

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Button
        sx={{ mt: 4, width: "100%" }}
        onClick={handleUpdateClick}
        variant="contained"
      >
        <SystemUpdateAltSharpIcon /> Update
      </Button>
    </Box>
  );
};

export default EntityEditionPage;
