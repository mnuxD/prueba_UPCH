import React from "react";
import "./styles.css";
import TableList from "./components/TableList/TableList";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useGetUsers } from "../../redux/hooks/userHooks";

const HomePage = () => {
  const { data, isLoading, refetch } = useGetUsers();
  return (
    <main className="main-container">
      <div className="container content">
        <h2>Mi tabla</h2>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <TableList isLoading={isLoading} data={data} refetch={refetch} />
        )}
      </div>
    </main>
  );
};

export default HomePage;
