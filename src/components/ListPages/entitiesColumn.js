import * as React from "react";
import Icones from "../Icones/Icones";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { isEmpty } from "lodash";

function getLabels(params, language) {
  const localLanguageParams = params.value.find(
    (item) => item.language === language
  );
  if (localLanguageParams) return params.value[0].value;
  return `label ${language} not available...`;
}

function getDescriptions(params, language) {
  const localLanguageParams = params.value.find(
    (item) => item.language === language
  );
  if (localLanguageParams) return params.value[0].value;
  return `description ${language} not available...`;
}

export const entitiesColumn = (language) => {
  return [
    {
      field: "id",
      hide: false,
      width: 100,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "actions",
      width: 200,
      sortable: false,
      align: "center",
      headerAlign: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Link component={RouterLink} to={`entities/${params.id}`}>
              <Icones iconeName="VisibilityIcon" />
            </Link>
          }
          label="view"
        />,
      ],
      editable: false,
    },
    {
      field: "name",
      headerName: "name",
      flex: 1,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "labels",
      headerName: "labels",
      flex: 1,
      headerAlign: "center",
      valueGetter: (params) => getLabels(params, language),
      editable: false,
    },
    {
      field: "descriptions",
      headerName: "descriptions",
      flex: 1,
      headerAlign: "center",
      valueGetter: (params) => getDescriptions(params, language),
      editable: false,
    },
  ];
};
