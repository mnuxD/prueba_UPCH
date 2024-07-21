import React, { useCallback, useMemo, useState } from "react";

import CustomTable from "../../../../components/CustomTable/CustomTable";
import TablePagination from "../../../../components/TablePagination/TablePagination";
import { UserType } from "../../../../types";
import { useTable } from "../../../../hooks/use-table";
import Header from "../Header/Header";

import "./styles.css";
import { getColumns } from "./columns";

interface Props {
  data: UserType[];
  isLoading: boolean;
}

const TableList = ({ data, isLoading }: Props) => {
  const [pageSize, setPageSize] = useState(10);

  const onDeleteItem = (id: string) => {
    console.log(id);
  };

  const onEditItem = (id: string) => {
    console.log(id);
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
        searchText={searchText}
        onSearchClear={handleResetSearch}
        onSearchChange={handleSearch}
        filters={filters}
        updateFilter={updateFilter}
        resetFilter={handleResetFilters}
      />
      <CustomTable data={tableData} columns={columns} />
      <TablePagination
        setPageSize={setPageSize}
        pageSize={pageSize}
        handlePaginate={handlePaginate}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </div>
  );
};

export default TableList;
