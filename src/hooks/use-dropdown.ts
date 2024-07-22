import { useState, useCallback, useEffect } from "react";
import {
  getOpenDropdownId,
  setOpenDropdownId,
  subscribeToDropdownChanges
} from "./dropdown-state";

export function useDropdown(id: string) {
  const [isOpen, setIsOpen] = useState(false);

  const updateIsOpen = useCallback(() => {
    setIsOpen(getOpenDropdownId() === id);
  }, [id]);

  useEffect(() => {
    const unsubscribe = subscribeToDropdownChanges(updateIsOpen);
    return unsubscribe;
  }, [updateIsOpen]);

  const toggleDropdown = useCallback(() => {
    const newState = !isOpen;
    setOpenDropdownId(newState ? id : null);
    setIsOpen(newState);
  }, [isOpen, id]);

  const closeDropdown = useCallback(() => {
    setOpenDropdownId(null);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest(`#dropdown-${id}`)) {
          closeDropdown();
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [isOpen, closeDropdown, id]);

  return { isOpen, toggleDropdown, closeDropdown };
}
