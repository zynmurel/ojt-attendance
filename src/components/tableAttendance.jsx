import React, { useState } from "react";
import {
  Table,
  Card,
  Space,
  DatePicker,
  Typography,
  Input,
  Button,
} from "antd";
import { GET_INTERN } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { AiOutlineFileExcel } from "react-icons/ai";
import moment from "moment";

const { RangePicker } = DatePicker;

const { Title } = Typography;
const { Search } = Input;
const { Column } = Table;

const TableAttendance = () => {
  const { data: InternData, loading, error } = useQuery(GET_INTERN);
  const [sortOrder, setSortOrder] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleTableChange = (pagination, filters, sorter) => {
    setSortOrder(sorter.order);

    let filteredResults = InternData?.ojt_attendance_user;

    // Apply date range filtering
    if (filters.start_date && filters.start_date.length === 2) {
      filteredResults = filteredResults.filter((item) => {
        const startDate = moment(item.start_date, "MM/DD/YY");
        return (
          startDate.isSameOrAfter(filters.start_date[0], "day") &&
          startDate.isSameOrBefore(filters.start_date[1], "day")
        );
      });
    }

    setFilteredData(filteredResults);
  };

  const onSearch = (value) => {
    const filteredResults = InternData?.ojt_attendance_user.filter(
      (item) =>
        item.first_name.toLowerCase().includes(value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(value.toLowerCase()) ||
        item.school_name.toLowerCase().includes(value.toLowerCase()) ||
        item.school_address.toLowerCase().includes(value.toLowerCase()) ||
        item.contact_number.toLowerCase().includes(value.toLowerCase()) ||
        item.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const getSortOrder = (column) => {
    if (sortOrder && sortOrder.columnKey === column) {
      return sortOrder.order;
    }
    return null;
  };

  return (
    <div className="bg-white">
      <Card className="w-full h-18 mb-10" direction="horizontal">
        <div className="flex flex-row gap-6 items-center">
          <Title level={3}>Intern Attendance</Title>

          <RangePicker className="h-9 text-black" format="MM/DD/YY" />

          <Search
            placeholder="Input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />

          <Button
            style={{ backgroundColor: "#a8acb4" }}
            className="flex flex-row items-center h-10 w-50"
          >
            <AiOutlineFileExcel className="mr-5" fontSize={30} />
            <div>Export Excel</div>
          </Button>
        </div>
      </Card>
      <Table
        dataSource={
          filteredData.length > 0
            ? filteredData
            : InternData?.ojt_attendance_user
        }
        onChange={handleTableChange}
      >
        <Column
          title="Name"
          key="name"
          sorter
          sortOrder={getSortOrder("first_name")}
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
          key="schoolAddress"
          sorter
          sortOrder={getSortOrder("schoolAddress")}
        />

        <Column
          title="Contact Number"
          dataIndex="contact_number"
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
          dataIndex="profile_pic"
          key="image"
          sorter
          sortOrder={getSortOrder("image")}
          render={(profile_pic) => (
            <img width={"50px"} height={"50px"} src={profile_pic} alt="df" />
          )}
        />

        <Column
          title="Start Date"
          dataIndex="start_date"
          key="startDate"
          render={(start_date) => moment(start_date).format("MM/DD/YY")}
        />
      </Table>
    </div>
  );
};

export default TableAttendance;
