import React from "react";
import HeaderCell from "../../../../components/HeaderCell/HeaderCell";
import { UserType } from "../../../../redux/apis/userApi/types";
import { Button } from "react-bootstrap";
import "./styles.css";

type Columns = {
  sortConfig?: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  sortConfig,
  checkedItems,
  onDeleteItem,
  onEditItem,
  onHeaderCellClick,
  onChecked
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
          title="Editar usuario"
          onClick={() => onEditItem(user.email)}
        >
          <i className="bi bi-pencil"></i>
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          className="p-1"
          title="Eliminar usuario"
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
        title="Nombre"
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
        title="Género"
        sortable
        sortConfig={sortConfig}
        keySort="gender"
        onClick={() => onHeaderCellClick("gender")}
      />
    ),
    dataIndex: "gender",
    key: "gender",
    width: 120,
    render: (gender: string) => gender
  },

  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
    width: 200,
    render: (address: string) => address
  },
  {
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
    width: 120,
    render: (phone: string) => phone
  },
  {
    title: "Correo electrónico",
    dataIndex: "email",
    key: "email",
    width: 150,
    render: (email: string) => email
  },
  {
    title: (
      <HeaderCell
        title="País"
        sortable
        sortConfig={sortConfig}
        keySort="country"
        onClick={() => onHeaderCellClick("country")}
      />
    ),
    dataIndex: "country",
    key: "country",
    width: 100,
    render: (country: string) => country
  }
  //   {
  //     // Need to avoid this issue ->  elements in a large <table> do not have table headers.
  //     title: <HeaderCell title="Acciones" className="opacity-0" />,
  //     dataIndex: "action",
  //     key: "action",
  //     width: 120,
  //     render: (_: string, row: Catalog) => (
  //       <div className="flex items-center justify-end gap-3 pe-4">
  //         <Tooltip
  //           size="sm"
  //           content={() => "Editar Catálogo"}
  //           placement="top"
  //           color="invert"
  //         >
  //           <Link href={routes.catalog.editCatalog(row.id!)}>
  //             <ActionIcon
  //               size="sm"
  //               variant="outline"
  //               aria-label={"Editar Catálogo"}
  //             >
  //               <PencilIcon className="h-4 w-4" />
  //             </ActionIcon>
  //           </Link>
  //         </Tooltip>

  //         <DeletePopover
  //           title={`Borrar Catálogo`}
  //           description={`¿Estás seguro de borrar ${row.name} de la lista de Catálogos?`}
  //           onDelete={() => onDeleteItem(row.id!)}
  //         />
  //       </div>
  //     )
  //   }
];
