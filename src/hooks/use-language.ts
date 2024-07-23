import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { languageApp } from "../helpers/helpers";

export function useLanguage() {
  const { i18n } = useTranslation();

  const language = languageApp();

  const handleChangeLanguage = (lng: string) => {
    localStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
  };

  return { language, handleChangeLanguage };
}
