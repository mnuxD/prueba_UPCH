import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import SelectWithSearch from "../../../../components/SelectWithShare/SelectWithShare";
import { countriesData } from "../../../../constants/countries";
import { gendersData } from "../../../../constants/genders";

interface Props {
  searchText: string;
  onSearchClear: () => void;
  onSearchChange: (searchValue: string) => void;
  filters: Record<string, any>;
  updateFilter: (filters: Record<string, any>) => void;
  resetFilter: () => void;
}

const Header = ({
  searchText,
  onSearchClear,
  onSearchChange,
  filters,
  updateFilter,
  resetFilter
}: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [dynamicFilters, setDynamicFilters] = useState(filters);

  const isFilterEmpty = Object.keys(dynamicFilters).length === 0;

  const toggleShowToast = () => setShowToast(!showToast);

  const handleChangeCountry = (value: string) => {
    setDynamicFilters({ ...dynamicFilters, nat: value });
  };

  const handleChangeGender = (value: string) => {
    setDynamicFilters({ ...dynamicFilters, gender: value });
  };

  const handleChangeSearchText = (value: string) => {
    onSearchChange(value);
  };

  const handleResetFilter = () => {
    setDynamicFilters({});
    resetFilter();
  };

  return (
    <div className="header-page">
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
              options={countriesData}
              title="NACIONALIDAD"
              handleChange={handleChangeCountry}
              selectedOption={dynamicFilters?.nat}
            />
            <SelectWithSearch
              options={gendersData}
              title="GÉNERO"
              handleChange={handleChangeGender}
              selectedOption={dynamicFilters?.gender}
            />
            <Button
              variant="primary"
              size="sm"
              className="toast__button"
              onClick={() => updateFilter(dynamicFilters)}
            >
              <i className="bi bi-search"></i> Buscar
            </Button>
            {!isFilterEmpty && (
              <Button
                variant="outline-danger"
                size="sm"
                className="toast__button"
                onClick={handleResetFilter}
              >
                <i className="bi bi-x-lg"></i> Limpiar
              </Button>
            )}
          </div>
        </Toast.Body>
      </Toast>
      <div className="search-input">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar"
          value={searchText}
          onChange={(e) => handleChangeSearchText(e.target.value)}
        />
        {searchText ? (
          <i
            onClick={onSearchClear}
            className="search-icon bi bi-x-lg pointer-icon"
          ></i>
        ) : (
          <i className="search-icon bi bi-search"></i>
        )}
      </div>
    </div>
  );
};

export default Header;
