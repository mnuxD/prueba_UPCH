import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";

export function useModal(idModal: string) {
  const modalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    modalRef.current = document.getElementById(idModal) as HTMLElement | null;

    if (!modalRef.current) {
      console.error(`Modal with id ${idModal} not found`);
    }

    return () => {
      if (modalRef.current) {
        const modalInstance = Modal.getInstance(modalRef.current);
        if (modalInstance) {
          modalInstance.dispose();
        }
      }
    };
  }, [idModal]);

  const openModal = () => {
    if (modalRef.current) {
      const modalInstance =
        Modal.getInstance(modalRef.current) || new Modal(modalRef.current);
      modalInstance.show();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      const modalInstance = Modal.getInstance(modalRef.current);
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
