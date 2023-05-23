import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  DatePicker,
  Typography,
  Input,
  Button,
  Image,
  List,
} from "antd";
import { GET_INTERN } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import { AiOutlineFileExcel } from "react-icons/ai";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { columns } from "../../tbl_col/internListTable";

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Search } = Input;

const InternList = () => {
  const { data: InternData, loading, error } = useQuery(GET_INTERN);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const emptyData = [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterDateRangeTable = (dates, dateStrings) => {
    if (!dates) return setFilteredData(InternData?.ojt_attendance_user);
    const [startDate, endDate] = dates;
    console.log(startDate, endDate);

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
      <Card className="  w-full h-18 mb-10  ">
        <div className="flex flex-col sm:flex-row  gap-6 items-center">
          <Title level={3}>Intern Attendance</Title>

          <RangePicker
            className="h-9 text-black sm:w-1/5  w-full  "
            format="MM/DD/YY"
            onChange={filterDateRangeTable}
          />

          <Search
            placeholder="Input search text"
            onChange={(e) => onSearch(e.target.value)}
            className=" sm:w-1/5  w-full "
          />

          <Button
            style={{ backgroundColor: "#a8acb4" }}
            className=" flex sm:flex-row items-center sm:self-start self-end"
            onClick={exportToExcel}
          >
            <AiOutlineFileExcel
              className="mr-5 hidden sm:block "
              fontSize={30}
            />
            <div>Export Excel</div>
          </Button>
        </div>
      </Card>
      {isMobile ? (
        <List
          className=" px-10"
          itemLayout="horizontal"
          dataSource={
            filteredData.length > 0
              ? filteredData
              : InternData?.ojt_attendance_user
          }
          renderItem={(record) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div className="flex gap-2">
                    <Typography.Text className="capitalize">
                      {record.first_name}
                    </Typography.Text>
                    <Typography.Text className="capitalize">
                      {record.last_name}
                    </Typography.Text>
                  </div>
                }
                description={
                  <>
                    <div>School Name: {record.school_name}</div>
                    <div>School Address: {record.school_address}</div>
                    <div>Contact Number: {record.contact_number}</div>
                    <div>Username: {record.username}</div>
                    <div>
                      Start Date: {moment(record.start_date).format("MM/DD/YY")}
                    </div>
                  </>
                }
              />
              <Image
                src={record.profile_pic}
                alt="Profile"
                style={{ width: 50, height: 50 }}
              />
            </List.Item>
          )}
        />
      ) : dateRange && dateRange.length > 0 && filteredData.length === 0 ? (
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

export default InternList;
