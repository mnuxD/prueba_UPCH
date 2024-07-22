import React from "react";
import "./styles.css";

const ErrorComponent = () => {
  return (
    <div className="loginContainer">
      <i className="bi bi-x-circle text-danger" style={{ fontSize: 50 }}></i>

      <h2>Error al traer la información.</h2>
    </div>
  );
};

export default ErrorComponent;
