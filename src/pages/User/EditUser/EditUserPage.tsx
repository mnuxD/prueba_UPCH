import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import CreateEditUser from "../components/CreateEditUser";
import { useGetUserById } from "../../../redux/hooks/userHooks";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import HeaderPage from "../../../components/HeaderPage/HeaderPage";

const EditUserPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetUserById(id || "");

  return (
    <main className="main-container">
      <div className="container">
        <HeaderPage title="Editar Usuario" previousUrl="/" />
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
