import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import SelectWithSearch from "../../../../components/SelectWithShare/SelectWithShare";
import { countriesData } from "../../../../constants/countries";
import { gendersData } from "../../../../constants/genders";
import ModalConfirmation from "../../../../components/ModalConfirmation/ModalConfirmation";
import { useModal } from "../../../../hooks/use-modal";
import { UserType } from "../../../../redux/apis/userApi/types";

interface Props {
  data: UserType[];
  searchText: string;
  onSearchClear: () => void;
  onSearchChange: (searchValue: string) => void;
  filters: Record<string, any>;
  updateFilter: (filters: Record<string, any>) => void;
  resetFilter: () => void;
  selectedUsers: string[];
  onDeleteGroup: () => void;
  cleanRowsSelected: () => void;
}

const Header = ({
  data,
  searchText,
  onSearchClear,
  onSearchChange,
  filters,
  updateFilter,
  resetFilter,
  selectedUsers,
  onDeleteGroup,
  cleanRowsSelected
}: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [dynamicFilters, setDynamicFilters] = useState(filters);
  const selectedUsersCount = selectedUsers.length;

  const { openModal: openDeleteGroupModal, closeModal: closeDeleteGroupModal } =
    useModal("deleteGroup");

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
        {selectedUsersCount > 0 && (
          <Button
            variant="outline-danger"
            className="buttonsContainer__button"
            size="sm"
            onClick={openDeleteGroupModal}
          >
            <i className="bi bi-trash3"></i> Eliminar {selectedUsersCount}{" "}
            usuario
            {selectedUsersCount > 1 && "s"}
          </Button>
        )}
        <ModalConfirmation
          title={`Eliminar usuarios seleccionados`}
          body={
            <div>
              <p>{`¿Está seguro que desea eliminar ${selectedUsersCount} usuario${
                selectedUsersCount > 0 && "s"
              }?`}</p>
              <ul>
                {data
                  .filter((user) =>
                    selectedUsers.some((email) => user.email === email)
                  )
                  .map((e) => (
                    <li key={e.email}>{e.name}</li>
                  ))}
              </ul>
            </div>
          }
          id="deleteGroup"
          onClose={closeDeleteGroupModal}
          onConfirm={onDeleteGroup}
        />
        {selectedUsersCount > 0 && (
          <Button
            variant="outline-secondary"
            className="buttonsContainer__button"
            size="sm"
            onClick={cleanRowsSelected}
          >
            <i className="bi bi-x-lg"></i> Limpiar selección
          </Button>
        )}
      </div>
      <Toast show={showToast} onClose={toggleShowToast} className="toast">
        <Toast.Body>
          <div className="toast__body">
            <SelectWithSearch
              id="dropdownNat"
              options={countriesData}
              title="NACIONALIDAD"
              handleChange={handleChangeCountry}
              selectedOption={dynamicFilters?.nat}
            />
            <SelectWithSearch
              id="dropdownGender"
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
