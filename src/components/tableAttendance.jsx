import React, { useState } from "react";
import {
  Table,
  Card,
  DatePicker,
  Typography,
  Input,
  Button,
  Image,
} from "antd";
import { GET_INTERN } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { AiOutlineFileExcel } from "react-icons/ai";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Name",
    key: "name",
    render: (record) => `${record.first_name} ${record.last_name}`,
  },
  {
    title: "School Name",
    dataIndex: "school_name",
    key: "school_name",
  },
  {
    title: "School Address",
    dataIndex: "school_address",
    key: "school_address",
  },
  {
    title: "Contact Number",
    dataIndex: "contact_number",
    key: "contact_number",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Image",
    key: "image",
    render: (record) => (
      <Image
        src={record.profile_pic}
        alt="Profile"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  {
    title: "Start Date",
    key: "start_date",
    render: (record) => moment(record.start_date).format("MM/DD/YY"),
  },
];

const TableAttendance = () => {
  const { data: InternData, loading, error } = useQuery(GET_INTERN);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const emptyData = [];

  const filterDateRangeTable = (dates, dateStrings) => {
    const [startDate, endDate] = dates;

    // Format the dates using Moment.js
    const formattedStartDate = moment(startDate.format()).format("MM/DD/YYYY");
    const formattedEndDate = moment(endDate.format()).format("MM/DD/YYYY");

    // Filter the data based on the date range
    const filteredResults = InternData?.ojt_attendance_user.filter(
      (item) =>
        (!formattedStartDate ||
          moment(item.start_date).isSameOrAfter(formattedStartDate)) &&
        (!formattedEndDate ||
          moment(item.start_date).isSameOrBefore(formattedEndDate))
    );
    setFilteredData(filteredResults);
    setDateRange(dates);
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

  const exportToExcel = () => {
    console.log(
      filteredData.length > 0 ? filteredData : InternData?.ojt_attendance_user
    );
    const exportData = InternData?.ojt_attendance_user.map((item) => ({
      Name: `${item.first_name} ${item.last_name}`,
      "School Name": item.school_name,
      "School Address": item.school_address,
      "Contact Number": item.contact_number,
      Username: item.username,
      "Start Date": moment(item.start_date).format("MM/DD/YY"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Intern Attendance");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, `Intern_List.xlsx`);
  };

  return (
    <div className="bg-white">
      <Card className="w-full h-18 mb-10" direction="horizontal">
        <div className="flex flex-row gap-6 items-center">
          <Title level={3}>Intern Attendance</Title>

          <RangePicker
            className="h-9 text-black"
            format="MM/DD/YY"
            onChange={filterDateRangeTable}
          />

          <Search
            placeholder="Input search text"
            onChange={(e) => onSearch(e.target.value)}
            style={{ width: 200 }}
          />

          <Button
            style={{ backgroundColor: "#a8acb4" }}
            className="flex flex-row items-center h-10 w-50"
            onClick={exportToExcel}
          >
            <AiOutlineFileExcel className="mr-5" fontSize={30} />
            <div>Export Excel</div>
          </Button>
        </div>
      </Card>
      {dateRange && dateRange.length > 0 && filteredData.length === 0 ? (
        <Table dataSource={emptyData} columns={columns} />
      ) : (
        <Table
          dataSource={
            filteredData.length > 0
              ? filteredData
              : InternData?.ojt_attendance_user
          }
          columns={columns}
        />
      )}
    </div>
  );
};

export default TableAttendance;
