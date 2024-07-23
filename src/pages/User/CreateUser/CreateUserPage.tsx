import React from "react";
import CreateEditUser from "../components/CreateEditUser";
import HeaderPage from "../../../components/HeaderPage/HeaderPage";
import { useTranslation } from "react-i18next";
import "./styles.css";

const CreateUserPage = () => {
  const { t } = useTranslation();
  return (
    <main className="mainContainerCreate">
      <div className="container">
        <HeaderPage title={t("createUser")} previousUrl="/" />
        <CreateEditUser />
      </div>
    </main>
  );
};

export default CreateUserPage;
