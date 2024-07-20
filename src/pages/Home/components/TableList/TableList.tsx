import React from "react";

import "./styles.css";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import TablePagination from "../../../../components/TablePagination/TablePagination";

const TableList = () => {
  return (
    <div>
      <CustomTable />
      <TablePagination />
    </div>
  );
};

export default TableList;
