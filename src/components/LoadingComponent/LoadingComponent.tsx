import React from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";

const LoadingComponent = () => {
  const { t } = useTranslation();
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

      <h2>{t("loading")}...</h2>
    </div>
  );
};

export default LoadingComponent;
