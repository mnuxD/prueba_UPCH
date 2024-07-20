import React from "react";
import "./styles.css";
import { PageHeader } from "./components/Header/Header";

const HomePage = () => {
  return (
    <main className="main">
      <div className="container">
        <h2>Mi tabla</h2>
        <PageHeader />
      </div>
    </main>
  );
};

export default HomePage;
