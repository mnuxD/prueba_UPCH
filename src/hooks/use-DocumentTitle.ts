import { useEffect } from "react";

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = `${title ? title : "Inicio"} | UPCH`;
  }, [title]);
};

export default useDocumentTitle;
