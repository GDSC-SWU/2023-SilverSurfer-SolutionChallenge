import { useEffect, useState } from "react";

const useIsOverflow = (element) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const scrollWidth = element.current?.scrollWidth;

  const trigger = () => {
    const overflow = element.current.scrollWidth > element.current.clientWidth;
    setIsOverflow(overflow);
  };

  useEffect(() => {
    if (element) {
      trigger();
    }
  }, [scrollWidth]);

  return isOverflow;
};

export default useIsOverflow;
