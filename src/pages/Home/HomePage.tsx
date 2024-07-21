import React from "react";
import "./styles.css";
import TableList from "./components/TableList/TableList";
import { useGetUsersQuery } from "../../redux/apis/userApi";
import { UserType } from "../../types";

const HomePage = () => {
  const { data, isLoading } = useGetUsersQuery({});

  const customData: UserType[] =
    data?.results.map((user) => {
      return {
        name: `${user.name.first} ${user.name.last}` || "",
        photo: user.picture.thumbnail || "",
        gender: user.gender || "",
        address:
          `${user.location.street.name} ${user.location.street.number}` || "",
        phone: user.phone || "",
        email: user.email || "",
        country: user.location.country || "",
        nat: user.nat || ""
      };
    }) || [];

  return (
    <main className="main-container">
      <div className="container content">
        <h2>Mi tabla</h2>
        {isLoading ? (
          "Cargando"
        ) : (
          <TableList isLoading={isLoading} data={customData} />
        )}
      </div>
    </main>
  );
};

export default HomePage;
