import { updateDefaultValues } from "../../../slices/entity-slice";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const ItemField = ({ fieldId, entityId, isChecked }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const field = useSelector((store) => store.field.byId[fieldId]);

  const handleClick = () => {
    history.push({
      pathname: `/fields/${fieldId}`,
    });
  };

  const onCheck = () => {
    dispatch(
      updateDefaultValues(
        {
          elementId: fieldId,
          entityId,
          elementType: "field",
        },
        [
          "id",
          "name",
          "defaultFields",
          "defaultActions",
          `labels {
            id
            language
            value
          }`,
          `descriptions {
            id
            language
            value
          }`,
          "childOrder",
        ],
        "update"
      )
    );
  };

  return (
    <>
      {field ? (
        <Card sx={{ minWidth: 275, maxWidth: 300 }}>
          <CardContent sx={{ padding: 0 }}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemText primary={`[${fieldId}] ${field.name}`} />
                <Checkbox checked={isChecked} onChange={() => onCheck()} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText secondary={field.labels[0].value} />
                <VisibilityOutlinedIcon
                  sx={{ color: "#1976D2" }}
                  onClick={handleClick}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
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

export default ItemField;
