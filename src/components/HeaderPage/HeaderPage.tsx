import React from "react";
import "./styles.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/use-DocumentTitle";

interface Props {
  title: string;
  previousUrl?: string;
}

const HeaderPage = ({ title, previousUrl }: Props) => {
  const navigate = useNavigate();
  useDocumentTitle(title);

  const goBack = () => {
    if (previousUrl) {
      navigate(previousUrl);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="d-flex gap-3 align-items-center mb-3">
      <Button onClick={goBack}>
        <i className="bi bi-caret-left-fill"></i>
      </Button>
      <h2 className="m-0">{title}</h2>
    </div>
  );
};

export default HeaderPage;
