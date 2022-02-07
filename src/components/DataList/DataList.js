import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import SearchBar from "../SearchBar/SearchBar";
import Alert from "@mui/material/Alert";

const DataList = (props) => {
  const {
    rows,
    columns,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    nameContains,
    rowCount,
    sx,
    step,
  } = props;

  const [rowClick, setRowClick] = useState({});

  const onRowClick = (selectValue) => {
    setRowClick(selectValue.row);
  };

  useEffect(() => {
    console.log("===============");
    console.log(columns);
  }, [columns]);

  useEffect(() => {
    console.log("===============");
    console.log(rows);
  }, [rows]);

  return (
    <>
      {process.env.REACT_APP_DEV_MODE && (
        <Alert severity="info" style={{ marginTop: 8 }}>
          <code>rowClick: {JSON.stringify(rowClick)}</code>
        </Alert>
      )}

      <SearchBar nameContains={nameContains} onSearchChange={onSearchChange} />
      <Box sx={sx || {}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          onRowClick={onRowClick}
          pageSize={step}
          editMode="row"
          onPageSizeChange={onPageSizeChange}
          rowCount={rowCount}
          paginationMode="client"
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

export default DataList;
