import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enLocale } from "./i18n/en";
import { esLocale } from "./i18n/es";
import { languageApp } from "./helpers/helpers";

const language = languageApp();

const resources = {
  en: enLocale,
  es: esLocale
};

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
