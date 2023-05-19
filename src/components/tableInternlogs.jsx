import React, { useState } from "react";
import { Table } from "antd";
const { Column } = Table;

const data = [
  {
    key: "1",
    name: "John Doe",
    date: "May 19, 2023",
    timeIn: "8:30 A.M",
    timeOut: "12:04 P.M",
    timeIns: "1:00 P.M",
    timeOuts: "5:00 P.M",
    renderedTime: "5:00 P.M",
    image: "url/to/image1.png",
  },
];

const TableInternLogs = () => {
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
    <div className=" bg-white">
      <Table dataSource={data} onChange={handleTableChange}>
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter
          sortOrder={getSortOrder("name")}
        />
        <Column
          title="Date"
          dataIndex="date"
          key="date"
          sorter
          sortOrder={getSortOrder("date")}
        />
        <Column
          title="Time In"
          dataIndex="timeIn"
          key="timeIn"
          sorter
          sortOrder={getSortOrder("timeIn")}
        />
        <Column
          title="Time Out"
          dataIndex="timeOut"
          key="timeOut"
          sorter
          sortOrder={getSortOrder("timeOut")}
        />
        <Column
          title="Time In"
          dataIndex="timeIns"
          key="timeIns"
          sorter
          sortOrder={getSortOrder("timeIn")}
        />
        <Column
          title="Time Out"
          dataIndex="timeOuts"
          key="timeOuts"
          sorter
          sortOrder={getSortOrder("timeOut")}
        />
        <Column
          title="Rendered Time"
          dataIndex="renderedTime"
          key="renderedTime"
          sorter
          sortOrder={getSortOrder("renderedTime")}
        />
        <Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(image) => (
            <img src={image} alt="User" style={{ width: "50px" }} />
          )}
        />
      </Table>
    </div>
  );
};

export default TableInternLogs;
