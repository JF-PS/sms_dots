import { useState, useCallback } from "react";

const useToggle = (defaultValue = null, isExclusive = true) => {
  const [value, setValue] = useState(defaultValue);

  const onToggleChange = useCallback((event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  }, []);

  const onToggleChangeExclusive = useCallback((event, newValue) => {
    if (newValue) setValue(newValue);
  }, []);

  return { value, onToggleChangeExclusive, onToggleChange };
};

export default useToggle;
