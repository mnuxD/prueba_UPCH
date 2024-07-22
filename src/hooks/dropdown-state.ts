let openDropdownId: string | null = null;
const listeners: Set<() => void> = new Set();

export const getOpenDropdownId = () => openDropdownId;

export const setOpenDropdownId = (id: string | null) => {
  openDropdownId = id;
  listeners.forEach((listener) => listener());
};

export const subscribeToDropdownChanges = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
