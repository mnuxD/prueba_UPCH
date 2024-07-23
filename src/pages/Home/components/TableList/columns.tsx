import React from "react";
import HeaderCell from "../../../../components/HeaderCell/HeaderCell";
import { UserType } from "../../../../redux/apis/userApi/types";
import { Button } from "react-bootstrap";
import "./styles.css";
import { TFunction } from "i18next";

type Columns = {
  sortConfig?: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  t: TFunction<"translation", undefined>;
};

export const getColumns = ({
  sortConfig,
  checkedItems,
  onDeleteItem,
  onEditItem,
  onHeaderCellClick,
  onChecked,
  t
}: Columns) => [
  {
    title: <HeaderCell title={<i className="bi bi-gear"></i>} />,
    dataIndex: "actions",
    key: "actions",
    width: 80,
    render: (_: string, user: UserType) => (
      <div className="d-flex gap-1 align-items-center">
        <input
          className="form-check-input"
          type="checkbox"
          checked={checkedItems.some((e) => e === user.email)}
          onChange={(e) => {
            if (onChecked) onChecked(user.email);
          }}
        />
        <Button
          variant="outline-primary"
          size="sm"
          className="p-1"
          title={t("editUser")}
          onClick={() => onEditItem(user.email)}
        >
          <i className="bi bi-pencil"></i>
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          className="p-1"
          title={t("deleteUser")}
          onClick={() => onDeleteItem(user.email)}
        >
          <i className="bi bi-trash3"></i>
        </Button>
      </div>
    )
  },
  {
    title: "",
    dataIndex: "photo",
    key: "photo",
    width: 40,
    render: (photo: string) => (
      <img src={photo} alt="photo-user" className="photoUser" />
    )
  },
  {
    title: (
      <HeaderCell
        title={t("name")}
        sortable
        sortConfig={sortConfig}
        keySort="name"
        onClick={() => onHeaderCellClick("name")}
      />
    ),
    dataIndex: "name",
    key: "name",
    width: 150,
    render: (name: string) => name
  },
  {
    title: (
      <HeaderCell
        title={t("gender")}
        sortable
        sortConfig={sortConfig}
        keySort="gender"
        onClick={() => onHeaderCellClick("gender")}
      />
    ),
    dataIndex: "gender",
    key: "gender",
    width: 120,
    render: (gender: string) => t(gender)
  },

  {
    title: t("address"),
    dataIndex: "address",
    key: "address",
    width: 200,
    render: (address: string) => address
  },
  {
    title: t("phone"),
    dataIndex: "phone",
    key: "phone",
    width: 120,
    render: (phone: string) => phone
  },
  {
    title: t("email"),
    dataIndex: "email",
    key: "email",
    width: 150,
    render: (email: string) => email
  },
  {
    title: (
      <HeaderCell
        title={t("country")}
        sortable
        sortConfig={sortConfig}
        keySort="country"
        onClick={() => onHeaderCellClick("country")}
      />
    ),
    dataIndex: "country",
    key: "country",
    width: 100,
    render: (country: string) => t(country)
  }
];
