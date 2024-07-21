import React, { useState } from "react";

import CustomTable from "../../../../components/CustomTable/CustomTable";
import TablePagination from "../../../../components/TablePagination/TablePagination";
import { UserType } from "../../../../types";
import { useTable } from "../../../../hooks/use-table";
import Header from "../Header/Header";

import "./styles.css";

interface Props {
  data: UserType[];
  isLoading: boolean;
}

const TableList = ({ data, isLoading }: Props) => {
  const [pageSize, setPageSize] = useState(10);

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
    handleResetFilters
  } = useTable(data, pageSize);

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
      <CustomTable data={tableData} />
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
