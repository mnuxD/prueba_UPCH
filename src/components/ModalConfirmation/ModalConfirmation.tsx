import React, { useState } from "react";
import { useModal } from "../../hooks/use-modal";
import ModalAlert from "../ModalAlert/ModalAlert";
import { useTranslation } from "react-i18next";
interface Props {
  id: string;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
  body?: React.ReactNode;
  errorMessage?: string;
  successMessage?: string;
}

const ModalConfirmation = ({
  id,
  title,
  body,
  onConfirm,
  onClose,
  errorMessage,
  successMessage
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const { openModal: openSuccessModal } = useModal("successModal");
  const { openModal: openErrorModal } = useModal("errorModal");

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      setIsLoading(false);
      openSuccessModal();
    } catch (error) {
      setIsLoading(false);
      openErrorModal();
    }
    onClose();
  };

  return (
    <>
      <ModalAlert id="successModal" type="success" message={successMessage} />
      <ModalAlert id="errorModal" type="error" message={errorMessage} />
      <div
        className="modal fade"
        id={id}
        aria-labelledby={id}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={id}>
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={isLoading}
              ></button>
            </div>
            {body && <div className="modal-body">{body}</div>}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                disabled={isLoading}
              >
                {t("close")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={isLoading}
              >
                {isLoading && (
                  <>
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>{" "}
                  </>
                )}
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirmation;
