import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";

const NoResults = () => {
  const { t } = useTranslation();
  return (
    <div className="noResultsContainer">
      <i className="bi bi-exclamation-triangle-fill text-warning noResultsIcon"></i>
      <h3>{t("noResults")}</h3>
    </div>
  );
};

export default NoResults;
