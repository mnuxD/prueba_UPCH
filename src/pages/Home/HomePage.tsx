import React from "react";
import TableList from "./components/TableList/TableList";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useGetUsers } from "../../redux/hooks/userHooks";
import { useTranslation } from "react-i18next";
import "./styles.css";

const HomePage = () => {
  const { data, isLoading, refetch } = useGetUsers();
  const { t } = useTranslation();

  return (
    <div className="mainContainer">
      <div className="container content">
        <h2>{t("title")}</h2>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <TableList isLoading={isLoading} data={data} refetch={refetch} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
