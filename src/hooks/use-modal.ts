import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";

export function useModal(idModal: string) {
  const openModal = () => {
    const modalElement = document.getElementById(idModal) as HTMLElement | null;
    if (modalElement) {
      const modalInstance =
        Modal.getInstance(modalElement) || new Modal(modalElement);
      modalInstance.show();
    } else {
      console.error(`Modal with id ${idModal} not found`);
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById(idModal) as HTMLElement | null;
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  return {
    openModal,
    closeModal
  };
}
