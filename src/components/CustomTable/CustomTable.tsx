import React from "react";
import { UserType } from "../../types";
import "./styles.css";

interface Props {
  data: UserType[];
}

const CustomTable = ({ data }: Props) => {
  return (
    <div className="customTable">
      <table className="table table-hover table-light" id="example">
        <thead>
          <tr>
            <th scope="col">
              <i className="bi bi-check-lg"></i>
            </th>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Genero</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>

            <th scope="col">Correo electrónico</th>

            <th scope="col">País</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.email}>
              <th scope="row">
                <input className="form-check-input" type="checkbox" value="" />
              </th>
              <td>
                <img
                  src={user.photo}
                  alt="photo-user"
                  className="img-thumbnail"
                />
              </td>

              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>

              <td>{user.email}</td>

              <td>{user.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
