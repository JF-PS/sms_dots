import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFieldById, updateFieldInfo } from "../slices/field-slice";
import { useParams } from "react-router";
import { cloneDeep } from "lodash";

import SystemUpdateAltSharpIcon from "@mui/icons-material/SystemUpdateAltSharp";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const FieldPage = () => {
  const [field, setField] = useState({
    descriptions: [],
    labels: [],
    name: "",
  });

  const dispatch = useDispatch();
  const { byId } = useSelector((store) => store.language);
  const { byId: storeField } = useSelector((store) => store.field);
  const { id } = useParams();

  const handleChange = (e) => {
    setField((current) => {
      const { id: language = "en", name = "label", value = "" } = e.target;
      const copy = cloneDeep(current);
      copy[name].find((item) => item.language === language).value = value;
      return copy;
    });
  };

  const handleUpdateClick = (element) => {
    const { id, value } = element;
    dispatch(
      updateFieldInfo(
        { id, value, fieldId: id },
        [
          `field: localizable {
            ... on Field {
              id
              name
              labels {
                id
                language
                value
                summary
              }
              descriptions {
                id
                language
                value
                summary
              }
            }
          }`,
        ],
        "update"
      )
    );
  };

  useEffect(() => {
    dispatch(
      getFieldById(
        { id },
        [
          "id",
          "name",
          `labels { 
            id
            language
            value
            summary
          }`,
          `descriptions { 
            id
            language
            value
            summary
          }`,
        ],
        "update"
      )
    ).then((result) => {
      setField(result);
    });
  }, [dispatch, id]);

  return (
    <Box>
      {process.env.REACT_APP_DEV_MODE && (
        <Alert severity="info" style={{ marginTop: 8 }}>
          <code>field: {JSON.stringify(storeField[id])}</code>
        </Alert>
      )}

      <Divider sx={{ mt: 1, mb: 4 }} />

      <Typography variant="h1" component="h1">
        {field.name}
      </Typography>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Typography variant="h4" component="h4">
        Labels :
      </Typography>

      {field.labels.map((label, index) => (
        <Stack key={index} spacing={2} sx={{ mt: 4 }} direction="row">
          <img
            key={`img${index}`}
            src={byId[label.language]}
            style={{ width: "8%", height: "60px" }}
            alt={"flagEs"}
          />
          <TextField
            key={`label${index}`}
            id={label.language}
            label={`label ${label.language}`}
            name="labels"
            multiline
            variant="outlined"
            sx={{ width: "70%" }}
            onChange={handleChange}
            value={label.value}
          />
          <Button
            key={`btn${index}`}
            sx={{ mt: 4, width: "23%" }}
            onClick={() => handleUpdateClick(label)}
            variant="contained"
          >
            <SystemUpdateAltSharpIcon /> Update
          </Button>
        </Stack>
      ))}

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Typography variant="h4" component="h4">
        Descriptions :
      </Typography>

      {field.descriptions.map((description, index) => (
        <Stack key={index} spacing={2} sx={{ mt: 4 }} direction="row">
          <img
            key={`img${index}`}
            src={byId[description.language]}
            style={{ width: "8%", height: "60px" }}
            alt={"flagEs"}
          />
          <TextField
            key={`description${index}`}
            id={description.language}
            label={`description ${description.language}`}
            multiline
            name="descriptions"
            variant="outlined"
            sx={{ width: "70%" }}
            onChange={handleChange}
            value={description.value}
          />
          <Button
            key={`btn${index}`}
            sx={{ mt: 4, width: "23%" }}
            onClick={() => handleUpdateClick(description)}
            variant="contained"
          >
            <SystemUpdateAltSharpIcon /> Update
          </Button>
        </Stack>
      ))}

      <Divider sx={{ mt: 4, mb: 4 }} />
    </Box>
  );
};

export default FieldPage;
