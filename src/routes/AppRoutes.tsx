import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import EditUserPage from "../pages/User/EditUser/EditUserPage";
import CreateUserPage from "../pages/User/CreateUser/CreateUserPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id/edit" element={<EditUserPage />} />
        <Route path="/user/create" element={<CreateUserPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
