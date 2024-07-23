import React from "react";
import { useParams } from "react-router-dom";
import CreateEditUser from "../components/CreateEditUser";
import { useGetUserById } from "../../../redux/hooks/userHooks";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import HeaderPage from "../../../components/HeaderPage/HeaderPage";
import { useTranslation } from "react-i18next";
import "./styles.css";

const EditUserPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const { data, isLoading, isError } = useGetUserById(id || "");

  return (
    <main className="mainContainerEdit">
      <div className="container">
        <HeaderPage title={t("editUser")} previousUrl="/" />
        {isLoading ? (
          <LoadingComponent />
        ) : isError ? (
          <ErrorComponent />
        ) : (
          data && <CreateEditUser data={data} />
        )}
      </div>
    </main>
  );
};

export default EditUserPage;
