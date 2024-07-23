import { useEffect } from "react";

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = `${title ? title : "Inicio"} | UPCH Prueba`;
  }, [title]);
};

export default useDocumentTitle;
