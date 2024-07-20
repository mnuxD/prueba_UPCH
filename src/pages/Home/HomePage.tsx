import React from "react";
import "./styles.css";
import { PageHeader } from "./components/Header/Header";
import TableList from "./components/TableList/TableList";

const HomePage = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="content">
          <h2>Mi tabla</h2>
          <PageHeader />
          <TableList />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
