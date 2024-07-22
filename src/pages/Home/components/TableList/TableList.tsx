import React, { useCallback, useMemo, useState } from "react";

import CustomTable from "../../../../components/CustomTable/CustomTable";
import TablePagination from "../../../../components/TablePagination/TablePagination";
import { UserType } from "../../../../types";
import { useTable } from "../../../../hooks/use-table";
import Header from "../Header/Header";

import "./styles.css";
import { getColumns } from "./columns";
import axios from "axios";
import { UserList } from "../../../../redux/apis/userApi/types";
import {
  BaseQueryFn,
  FetchBaseQueryError,
  QueryActionCreatorResult
} from "@reduxjs/toolkit/query";
import { QueryDefinition } from "@reduxjs/toolkit/query";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { useModal } from "../../../../hooks/use-modal";
import ModalConfirmation from "../../../../components/ModalConfirmation/ModalConfirmation";

interface Props {
  data: UserType[];
  isLoading: boolean;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      {
        nat?: string;
        gender?: string;
      },
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      "getUsers",
      UserList,
      "userAPI"
    >
  >;
}

const TableList = ({ data, isLoading, refetch }: Props) => {
  const [pageSize, setPageSize] = useState(10);
  const [userToDelete, setUserToDelete] = useState("");

  const nameUserToDelete =
    data.find((e) => e.email === userToDelete)?.name || "";

  const {
    openModal: handleOpenDeleteModal,
    closeModal: handleCloseDeleteModal
  } = useModal("deleteItem");

  const onDeleteItem = async (id: string) => {
    setUserToDelete(id);
    handleOpenDeleteModal();
  };

  const handleDeleteItem = async () => {
    const emailToEdit = userToDelete;
    try {
      // Simulate delete query
      await axios.get("https://randomuser.me/api/?results=500");
      //Forced error
      if (emailToEdit === "ana.gallardo@example.com") {
        throw new Error();
      }
      refetch();
    } catch (error) {
      throw error;
    }
    setUserToDelete("");
  };

  const onEditItem = (id: string) => {
    console.log(id);
  };

  const handleDeleteGroup = async (selectedUsers: string[]): Promise<void> => {
    try {
      // Simulate delete query
      await axios.get("https://randomuser.me/api/?results=500");
      //Forced error
      if (selectedUsers.length === 3) throw new Error();
      handleCleanRowsSelected();
      refetch();
    } catch (error) {
      throw error;
    }
  };

  const {
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchText,
    handleSearch,
    handleResetSearch,
    handleResetFilters,
    sortConfig,
    handleSort,
    selectedRowKeys,
    handleCleanRowsSelected,
    handleRowSelect
  } = useTable(data, pageSize);

  const onHeaderCellClick = (value: string) => {
    handleSort(value);
  };

  const columns = useMemo(
    () =>
      getColumns({
        sortConfig,
        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        onHeaderCellClick,
        onDeleteItem,
        onEditItem
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect
    ]
  );

  return (
    <div className="tableContainer">
      <Header
        data={data}
        searchText={searchText}
        onSearchClear={handleResetSearch}
        onSearchChange={handleSearch}
        filters={filters}
        updateFilter={updateFilter}
        resetFilter={handleResetFilters}
        selectedUsers={selectedRowKeys}
        onDeleteGroup={() => handleDeleteGroup(selectedRowKeys)}
        cleanRowsSelected={handleCleanRowsSelected}
      />
      <CustomTable data={tableData} columns={columns} />
      <TablePagination
        setPageSize={setPageSize}
        pageSize={pageSize}
        handlePaginate={handlePaginate}
        currentPage={currentPage}
        totalItems={totalItems}
      />
      <ModalConfirmation
        id="deleteItem"
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteItem}
        title="Eliminar Usuario"
        body={`¿Desea eliminar a ${nameUserToDelete} permanentemente?`}
      />
    </div>
  );
};

export default TableList;
