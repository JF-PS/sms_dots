import { updateDefaultValues } from "../../../slices/entity-slice";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const ItemAction = ({ actionId, entityId, isChecked, sectionId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const action = useSelector((store) => store.action.byId[actionId]);

  const handleClick = () => {
    history.push({
      pathname: `/actions/${actionId}`,
    });
  };

  const onCheck = () => {
    dispatch(
      updateDefaultValues(
        {
          elementId: actionId,
          entityId,
          elementType: "action",
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
      {action ? (
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{ padding: 0 }}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemText primary={action.name} />
                <Checkbox checked={isChecked} onChange={() => onCheck()} />
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemText secondary={action.labels[0].value} />
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

export default ItemAction;
