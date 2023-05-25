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
import { FILTER_INTERN, GET_INTERN } from "../../graphql/query";
import { useQuery, useLazyQuery } from "@apollo/client";
import { AiOutlineFileExcel } from "react-icons/ai";
import moment from "moment";
import { debounce } from "lodash";
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
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState(null);

  let condition = `{
    _and:[{ role: { _eq: "intern" } },{_or: [
      { first_name: { _iregex: $search } }
      { last_name: { _iregex: $search } }
      { school_name: { _iregex: $search } }
      { school_address: { _iregex: $search } }
      { username: { _iregex: $search } }
    ]}]
  }`;
  let tableData = InternData?.ojt_attendance_user;
  if (searchDate && searchText) {
    condition = `{_and:[{ role: { _eq: "intern" } },{_or: [{first_name: {_iregex: $search}}, {last_name: {_iregex: $search}}]},{start_date: {_gte:"${searchDate[0].format(
      "YYYY-MM-DD"
    )}"}}, {start_date: {_lte: "${searchDate[1].format("YYYY-MM-DD")}"}}]}`;
  } else if (!searchText && searchDate) {
    condition = `{_and: [{_or:[{first_name:{_iregex:$search}}]}{start_date: {_gte: "${searchDate[0].format(
      "YYYY-MM-DD"
    )}"}}, {start_date: {_lte: "${searchDate[1].format("YYYY-MM-DD")}"}}]}`;
  }
  const [getIntern, { loadingData, data }] = useLazyQuery(
    FILTER_INTERN(condition)
  );

  if (searchDate || searchText) {
    tableData = data?.ojt_attendance_user;
  }

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

  const handleInput = debounce((event) => {
    const { value } = event.target;
    setSearchText(event.target.value);
    console.log(value);
  }, 1000);

  useEffect(() => {
    getIntern({ variables: { search: searchText } });
  }, [searchDate, searchText]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
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
    <div>
      <Card className="  w-full h-18 mb-10  ">
        <div className="flex flex-col sm:flex-row  gap-6 items-center">
          <Title level={3}>Intern Attendance</Title>

          <RangePicker
            className="h-9 text-black sm:w-1/5  w-full  "
            format="MM/DD/YY"
            onChange={(e) => {
              setSearchDate(e);
            }}
          />

          <Search
            placeholder="Input search text"
            className=" sm:w-1/5  w-full "
            onChange={handleInput}
          />

          <Button
            style={{ backgroundColor: "#a8acb4" }}
            className=" flex sm:flex-row items-center  "
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
        <Card>
          <List
            className=" px-10"
            itemLayout="horizontal"
            dataSource={tableData}
            renderItem={(record) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div className="flex gap22-2">
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
                        Start Date:{" "}
                        {moment(record.start_date).format("MM/DD/YY")}
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
        </Card>
      ) : (
        <Card>
          <Table dataSource={tableData} columns={columns} />
        </Card>
      )}
    </div>
  );
};

export default InternList;
