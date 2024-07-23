import React from "react";
import { UserType } from "../../redux/apis/userApi/types";
import NoResults from "../NoResults/NoResults";
import "./styles.css";

interface Props {
  data: UserType[];
  columns: Column[];
}

type Column = {
  title: React.ReactNode;
  dataIndex: string;
  key: string;
  width: number;
  onHeaderCell?: (value: string) => void;
  render: (value: any, record?: any, index?: number) => React.ReactNode;
};

const CustomTable = ({ data, columns }: Props) => {
  return (
    <div className="customTable">
      <table className="table table-hover table-light">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                onClick={() =>
                  col?.onHeaderCell && col.onHeaderCell(col.dataIndex)
                }
                style={{
                  width: col.width,
                  background: "#d3dbdb",
                  zIndex: 1
                }}
                key={col.key}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {/* @ts-ignore */}
                  {col.render(record[col.dataIndex], record, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length === 0 && <NoResults />}
    </div>
  );
};

export default CustomTable;
