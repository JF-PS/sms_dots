import { useSelector, useDispatch } from "../store/store";
import { setValue } from "../slices/app-slice";

const selector = (store) => store.app;

export default function useDrawerConnected() {
  const { navBarDrawerOpen, navBarDrawerAnchor } = useSelector(selector);
  const dispatch = useDispatch();

  const handleNavBarDrawerOpen = () => {
    dispatch(setValue("navBarDrawerOpen", true));
  };

  const handleNavBarDrawerClose = () => {
    dispatch(setValue("navBarDrawerOpen", false));
  };

  const handleChangeNavBarDrawerAnchor = (value) => {
    dispatch(setValue("navBarDrawerAnchor", value));
  };

  return {
    onOpen: handleNavBarDrawerOpen,
    onClose: handleNavBarDrawerClose,
    onChangeAnchor: handleChangeNavBarDrawerAnchor,
    anchor: navBarDrawerAnchor,
    open: navBarDrawerOpen,
  };
}
