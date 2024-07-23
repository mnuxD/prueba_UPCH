import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./styles.css";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="notFoundContainer">
      <i className="bi bi-bug-fill text-warning iconError"></i>
      <h1>404 - {t("pageNotFound")}</h1>
      <p>{t("messageNotFound")}</p>
      <Button
        onClick={() => {
          window.location.assign("/");
        }}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
