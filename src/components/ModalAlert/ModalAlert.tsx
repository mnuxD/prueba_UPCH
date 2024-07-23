import React from "react";
import "./styles.css";

interface Props {
  id: string;
  message?: React.ReactNode;
  type: "success" | "error" | "alert";
}

const ModalAlert = ({ id, message, type }: Props) => {
  const dynamicIcon = () => {
    if (type === "success")
      return <i className="bi bi-check-circle text-success customIcon"></i>;
    if (type === "error")
      return <i className="bi bi-x-circle text-danger customIcon"></i>;

    return <i className="bi bi-exclamation-circle text-warning customIcon"></i>;
  };

  const customHeader = () => {
    if (type === "success") return "successHeader";
    if (type === "error") return "errorHeader";
    return "alertHeader";
  };

  const messageSend = () => {
    if (message) return message;
    if (type === "success") return "Operación exitosa";
    if (type === "error") return "Ha ocurrido un error";
    return "Mensaje de alerta";
  };

  return (
    <div className="modal fade" id={id} aria-labelledby={id} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content customContent">
          <div className={`modal-header ${customHeader()}`}>
            <div className="modal-title fs-5 titleContainer" id={id}>
              {dynamicIcon()} <h4 className="customTitle">{messageSend()}</h4>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
