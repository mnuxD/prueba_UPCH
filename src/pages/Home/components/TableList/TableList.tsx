import React, { useMemo, useState } from "react";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import TablePagination from "../../../../components/TablePagination/TablePagination";
import { useTable } from "../../../../hooks/use-table";
import Header from "../Header/Header";
import { getColumns } from "./columns";
import { UserType } from "../../../../redux/apis/userApi/types";
import { useModal } from "../../../../hooks/use-modal";
import ModalConfirmation from "../../../../components/ModalConfirmation/ModalConfirmation";
import { useDeleteUser } from "../../../../redux/hooks/userHooks";
import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface Props {
  data: UserType[];
  isLoading: boolean;
  refetch: () => void;
}

const TableList = ({ data, isLoading, refetch }: Props) => {
  const [pageSize, setPageSize] = useState(10);
  const [userToDelete, setUserToDelete] = useState("");
  const { deleteUser } = useDeleteUser();

  const filters = useSelector((state: RootState) => state.users.filters);

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
      await deleteUser(emailToEdit);
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
      for (const email of selectedUsers) {
        await deleteUser(email);
      }
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
    searchText,
    handleSearch,
    handleResetSearch,
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
