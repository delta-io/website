import { useEffect } from "react";

export const useNoScroll = (state) => {
  useEffect(() => {
    const htmlRef = document.querySelector("html");

    if (htmlRef && state === true) {
      htmlRef.style.overflow = "hidden";
    }

    return () => {
      if (htmlRef) {
        htmlRef.style.overflow = "auto";
      }
    };
  }, [state]);
};
