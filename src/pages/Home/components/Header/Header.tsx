"use client";

import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import SelectWithSearch from "../../../../components/SelectWithShare/SelectWithShare";
import { countriesData } from "../../../../constants/countries";
import { gendersData } from "../../../../constants/genders";

export const PageHeader = () => {
  const [showToast, setShowToast] = useState(false);

  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <div className="body">
      <div className="buttonsContainer">
        <Button
          variant="outline-primary"
          className="buttonsContainer__button"
          size="sm"
          onClick={toggleShowToast}
        >
          <i className="bi bi-sliders"></i> Filtros
        </Button>
        <Button
          variant="outline-primary"
          className="buttonsContainer__button"
          size="sm"
        >
          <i className="bi bi-pencil"></i> Editar
        </Button>
        <Button
          variant="outline-danger"
          className="buttonsContainer__button"
          size="sm"
        >
          <i className="bi bi-trash3"></i> Eliminar
        </Button>
      </div>
      <Toast show={showToast} onClose={toggleShowToast} className="toast">
        <Toast.Body>
          <div className="toast__body">
            <SelectWithSearch
              className=""
              options={countriesData}
              title="NACIONALIDAD"
            />
            <SelectWithSearch options={gendersData} title="GÉNERO" />
            <Button variant="primary" size="sm" className="toast__button">
              <i className="bi bi-search"></i> Buscar
            </Button>
          </div>
        </Toast.Body>
      </Toast>
      <div className="search-input">
        <input type="text" className="form-control" placeholder="Buscar" />
        <span className="search-icon bi bi-search"></span>
      </div>
    </div>
  );
};
