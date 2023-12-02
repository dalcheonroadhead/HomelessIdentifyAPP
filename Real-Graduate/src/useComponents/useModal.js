import { useEffect, useState } from "react";

export const useModal = () => {
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [firstScreenVisible, setFirstScreenVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFirstScreenVisible(false);
    }, 3000);
  }, []);

  return {
    loadingVisible,
    setLoadingVisible,
    firstScreenVisible,
  };
};
