import React from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";

const ErrorComponent = () => {
  const { t } = useTranslation();
  return (
    <div className="loginContainer">
      <i className="bi bi-x-circle text-danger" style={{ fontSize: 50 }}></i>

      <h2>{t("errorGetInformation")}</h2>
    </div>
  );
};

export default ErrorComponent;
