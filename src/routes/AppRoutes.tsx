import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import EditUserPage from "../pages/User/EditUser/EditUserPage";
import CreateUserPage from "../pages/User/CreateUser/CreateUserPage";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id/edit" element={<EditUserPage />} />
        <Route path="/user/create" element={<CreateUserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
