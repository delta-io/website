import { useRef, useEffect, useState } from "react";

const defaultOptions = {
  rootMargin: "0px",
  threshold: 1,
};

/**
 * Returns the currently visible element's ID on a screen
 */
const useIdObserver = (init, options = defaultOptions) => {
  const [activeId, setActiveId] = useState();
  const observer = useRef();

  useEffect(() => {
    if (document) {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        const intersections = entries.reduce((ids, entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio !== 1) {
            return ids;
          }

          const id = entry.target.getAttribute("id");

          if (!id) {
            return ids;
          }

          return [...ids, entry.target.getAttribute("id")];
        }, []);

        if (intersections.length > 0) {
          const lastIntersection = intersections[intersections.length - 1];
          setActiveId(lastIntersection);
        }
      }, options);

      init(observer.current);
    }

    return () => {
      if (observer.current && "disconnect" in observer.current) {
        observer.current.disconnect();
      }
    };
  }, [init, options]);

  return activeId;
};

export default useIdObserver;
