import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ContentDialog = (props) => {
  const {
    dialogTitle = "",
    value,
    label,
    onToggle,
    onActionClick,
    onChange,
  } = props;

  return (
    <>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={label}
          name={value}
          type="text"
          onChange={onChange}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onToggle}>Cancel</Button>
        <Button onClick={onActionClick}>Create</Button>
      </DialogActions>
    </>
  );
};

export default ContentDialog;
