import React from "react";
import "./styles.css";
import { PageHeader } from "./components/Header/Header";

const HomePage = () => {
  return (
    <main className="main">
      <h2>Mi tabla</h2>
      <PageHeader />
    </main>
  );
};

export default HomePage;
