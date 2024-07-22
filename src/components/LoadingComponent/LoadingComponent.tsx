import React from "react";
import "./styles.css";

const LoadingComponent = () => {
  return (
    <div className="loginContainer">
      <div className="customSpiner">
        <div
          className="spinner-border text-primary spinner-border-lg "
          role="status"
          style={{ width: 50, height: 50 }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      <h2>Cargando...</h2>
    </div>
  );
};

export default LoadingComponent;
