import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./use-language";

const useDocumentTitle = (title?: string) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  useEffect(() => {
    document.title = `${title ? title : t("home")} | UPCH ${t("test")}`;
  }, [title, language]);
};

export default useDocumentTitle;
