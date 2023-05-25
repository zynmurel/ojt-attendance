import React, { useState } from "react";
import { Table, Image } from "antd";
import { useQuery } from "@apollo/client";
import { INTERN_LOGS } from "../graphql/query";
import { useAuth } from "../hooks/Auth";
import moment from "moment";
import { columns } from "../tbl_col/internColumn";

const TableInternLogs = () => {
  const { internId } = useAuth();
  const {
    data: InternAttendance,
    loading,
    error,
  } = useQuery(INTERN_LOGS, { variables: { id: internId } });

  console.log(!loading && InternAttendance);

  const [sortOrder, setSortOrder] = useState(null);

  const handleTableChange = (pagination, filters, sorter) => {
    setSortOrder(sorter.order);
  };

  const getSortOrder = (column) => {
    if (sortOrder && sortOrder.columnKey === column) {
      return sortOrder.order;
    }
    return null;
  };

  return (
    <div className="bg-white">
      <Table
        columns={columns}
        dataSource={InternAttendance?.ojt_attendance_attendance}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TableInternLogs;
