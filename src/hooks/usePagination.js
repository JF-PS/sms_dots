import { useState, useCallback } from "react";

const usePagination = (defaultSkip = 0, defaultStep = 25) => {
  const [skip, setSkip] = useState(defaultSkip);
  const [step, setStep] = useState(defaultStep);

  const handlePageChange = useCallback(
    (currentSkip) => {
      setSkip(currentSkip * step);
    },
    [setSkip, step]
  );

  return { skip, handlePageChange, step, setStep };
};

export default usePagination;
