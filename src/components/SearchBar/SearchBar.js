import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const { nameContains, onSearchChange } = props;

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        textAlign: "center",
        m: "15px 0px 15px 0px",
        display: "flex",
        alignItems: "center",
        width: "99%",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        onChange={onSearchChange}
        value={nameContains}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
