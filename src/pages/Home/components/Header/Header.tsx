import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { countriesData } from "../../../../constants/countries";
import { gendersData } from "../../../../constants/genders";
import ModalConfirmation from "../../../../components/ModalConfirmation/ModalConfirmation";
import { useModal } from "../../../../hooks/use-modal";
import { UserType } from "../../../../redux/apis/userApi/types";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../../redux/features/usersSlice";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../../../hooks/use-DocumentTitle";
import "./styles.css";
import { useTranslation } from "react-i18next";

interface Props {
  data: UserType[];
  searchText: string;
  onSearchClear: () => void;
  onSearchChange: (searchValue: string) => void;
  filters: Record<string, any>;
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
  selectedUsers,
  onDeleteGroup,
  cleanRowsSelected
}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useDocumentTitle();
  const [showToast, setShowToast] = useState(false);
  const [dynamicFilters, setDynamicFilters] = useState(filters);
  const selectedUsersCount = selectedUsers.length;

  const { openModal: openDeleteGroupModal, closeModal: closeDeleteGroupModal } =
    useModal("deleteGroup");

  const isFilterEmpty = Object.keys(dynamicFilters).length === 0;

  const toggleShowToast = () => setShowToast(!showToast);

  const handleCreateUser = () => {
    navigate("/user/create");
  };

  const handleUpdateFilter = () => {
    dispatch(setFilters(dynamicFilters));
  };

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
    dispatch(setFilters({}));
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
          <i className="bi bi-sliders"></i> {t("filters")}
        </Button>
        {selectedUsersCount > 0 && (
          <Button
            variant="outline-danger"
            className="buttonsContainer__button"
            size="sm"
            onClick={openDeleteGroupModal}
          >
            <i className="bi bi-trash3"></i> {t("delete")} {selectedUsersCount}{" "}
            {t("user")}
            {selectedUsersCount > 1 && "s"}
          </Button>
        )}
        <ModalConfirmation
          title={t("deleteSelectedUsers")}
          body={
            <div>
              <p>{`${t("sureDeleteUsers")} ${selectedUsersCount} ${t("user")}${
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
            <i className="bi bi-x-lg"></i> {t("cleanSelected")}
          </Button>
        )}
      </div>
      <Toast show={showToast} onClose={toggleShowToast} className="toast">
        <Toast.Body>
          <div className="toast__body">
            <CustomSelect
              classNameButton="customSelect"
              id="dropdownNat"
              options={countriesData.map((e) => {
                return { label: `${e.flag} ${t(e.label)}`, value: e.value };
              })}
              title={t("nationality")}
              handleChange={handleChangeCountry}
              selectedOption={dynamicFilters?.nat}
            />
            <CustomSelect
              classNameButton="customSelect"
              id="dropdownGender"
              options={gendersData.map((e) => {
                return { label: t(e.label), value: e.value };
              })}
              title={t("gender")}
              handleChange={handleChangeGender}
              selectedOption={dynamicFilters?.gender}
            />
            <Button
              variant="primary"
              size="sm"
              className="toast__button"
              onClick={handleUpdateFilter}
            >
              <i className="bi bi-search"></i> {t("search")}
            </Button>
            {!isFilterEmpty && (
              <Button
                variant="outline-danger"
                size="sm"
                className="toast__button"
                onClick={handleResetFilter}
              >
                <i className="bi bi-x-lg"></i> {t("clean")}
              </Button>
            )}
          </div>
        </Toast.Body>
      </Toast>
      <div className="d-flex w-100 gap-3 justify-content-between">
        <div className="search-input">
          <input
            type="text"
            className="form-control"
            placeholder={t("search")}
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
        <Button
          variant="primary"
          size="sm"
          className="toast__button"
          onClick={handleCreateUser}
        >
          <i className="bi bi-person-add"></i> {t("newUser")}
        </Button>
      </div>
    </div>
  );
};

export default Header;
