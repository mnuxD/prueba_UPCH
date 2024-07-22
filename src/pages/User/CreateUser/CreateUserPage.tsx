import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import CreateEditUser from "../components/CreateEditUser";

const CreateUserPage = () => {
  return (
    <main className="main-container container">
      <h2>Crear usuario</h2>
      <CreateEditUser />
    </main>
  );
};

export default CreateUserPage;
