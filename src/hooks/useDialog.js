import { useState, useCallback } from "react";

const useDialog = (isOpen = false) => {
  const [open, setOpen] = useState(isOpen);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  return { open, onOpen, onClose, onToggle };
};

export default useDialog;
