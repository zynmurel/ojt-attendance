import React, { useState } from "react";
import { Table } from "antd";
import { GET_INTERN } from "../graphql/query";
import { useQuery } from "@apollo/client";
import moment from "moment";

const { Column } = Table;

const TableAttendance = () => {
  const { data: InternData, loading, error } = useQuery(GET_INTERN);
  console.log(
    InternData?.ojt_attendance_user && InternData?.ojt_attendance_user
  );
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
      <Table
        dataSource={InternData?.ojt_attendance_user}
        onChange={handleTableChange}
      >
        <Column
          title="Name"
          key="name"
          sorter
          sortOrder={getSortOrder("name")}
          render={(_) => <>{_.first_name + " " + _.last_name}</>}
        />
        <Column
          title="School Name"
          dataIndex="school_name"
          key="schoolName"
          sorter
          sortOrder={getSortOrder("schoolName")}
        />

        <Column
          title="School Address"
          dataIndex="school_address"
          key="schoolName"
          sorter
          sortOrder={getSortOrder("schoolName")}
        />
        <Column
          title="Contact Number"
          dataIndex="contact_number"
          key="schoolName"
          sorter
          sortOrder={getSortOrder("schoolName")}
        />

        <Column
          title="Username"
          dataIndex="username"
          key="schoolName"
          sorter
          sortOrder={getSortOrder("schoolName")}
        />

        <Column
          title="School Address"
          dataIndex="school_address"
          key="schoolName"
          sorter
          sortOrder={getSortOrder("schoolName")}
        />

        <Column
          title="Image"
          key="schoolName"
          sorter
          sortOrder={getSortOrder("schoolName")}
          render={(_) => (
            <img width={"50px"} height={"50px"} src={_.profile_pic} alt="df" />
          )}
        />

        <Column
          title="Start_Date"
          dataIndex="start_date"
          key="date"
          render={(date) => moment(date).format("MM/DD/YY")}
        />
      </Table>
    </div>
  );
};

export default TableAttendance;
