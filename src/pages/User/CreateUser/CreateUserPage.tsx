import React from "react";
import "./styles.css";
import CreateEditUser from "../components/CreateEditUser";
import HeaderPage from "../../../components/HeaderPage/HeaderPage";

const CreateUserPage = () => {
  return (
    <main className="main-container">
      <div className="container">
        <HeaderPage title="Crear Usuario" previousUrl="/" />
        <CreateEditUser />
      </div>
    </main>
  );
};

export default CreateUserPage;
