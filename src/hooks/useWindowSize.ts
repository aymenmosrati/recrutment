import { useState, useEffect } from "react";
import { useWindowSizeType } from "../types/WindowSize.types";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<any>(
    {} as any
  );

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
