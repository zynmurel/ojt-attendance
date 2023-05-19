import React, { useState } from "react";
import { Table } from "antd";
const { Column } = Table;

const data = [
  {
    key: "1",
    name: "John Doe",
    schoolName: "ABC School",
    schoolAddress: "123 Main Street",
    contactNumber: "555-1234",
    username: "johndoe",
    image: "url/to/image1.png",
  },

  {
    key: "2",
    name: "Cedric Doe",
    schoolName: "ABC School",
    schoolAddress: "123 Main Street",
    contactNumber: "555-1234",
    username: "johndoe",
    image: "url/to/image1.png",
  },
];

const TableAttendance = () => {
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
          title="School Name"
          dataIndex="schoolName"
          key="schoolName"
          sorter
          sortOrder={getSortOrder("schoolName")}
        />
        <Column
          title="School Address"
          dataIndex="schoolAddress"
          key="schoolAddress"
          sorter
          sortOrder={getSortOrder("schoolAddress")}
        />
        <Column
          title="Contact Number"
          dataIndex="contactNumber"
          key="contactNumber"
          sorter
          sortOrder={getSortOrder("contactNumber")}
        />
        <Column
          title="Username"
          dataIndex="username"
          key="username"
          sorter
          sortOrder={getSortOrder("username")}
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

export default TableAttendance;
