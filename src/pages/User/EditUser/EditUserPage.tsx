import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import CreateEditUser from "../components/CreateEditUser";
import { useGetUserById } from "../../../redux/hooks/userHooks";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";

const EditUserPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetUserById(id || "");

  return (
    <main className="main-container container">
      <h2>Editar usuario</h2>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent />
      ) : (
        data && <CreateEditUser data={data} slug={data.email} />
      )}
    </main>
  );
};

export default EditUserPage;
