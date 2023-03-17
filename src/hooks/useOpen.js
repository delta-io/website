import { useCallback, useMemo, useState } from "react";

export const useOpen = (init = false) => {
  const [isOpen, setIsOpen] = useState(init);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      onOpen,
      onClose,
      onToggle,
    }),
    [isOpen, setIsOpen, onOpen, onClose, onToggle]
  );
};
