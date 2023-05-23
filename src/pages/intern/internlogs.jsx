import React from "react";
import { Card, Typography, DatePicker, Table, Image } from "antd";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { INTERN_LOGS } from "../../graphql/query";
import { useAuth } from "../../hooks/Auth";
import { columns } from "../../tbl_col/internColumn";
import moment from "moment";

function Internlogs() {
  const { internId } = useAuth();
  const {
    data: InternData,
    loading,
    error,
  } = useQuery(INTERN_LOGS, { variables: { id: internId } });

  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const emptyData = [];

  const [sortOrder, setSortOrder] = useState(null);

  const filterDateRangeTable = (dates, dateStrings) => {
    if (!dates) return setFilteredData(InternData?.ojt_attendance_attendance);
    const [startDate, endDate] = dates;

    // Format the dates using Moment.js
    const formattedStartDate = moment(startDate.format()).format("MM/DD/YYYY");
    const formattedEndDate = moment(endDate.format()).format("MM/DD/YYYY");

    // Filter the data based on the date range
    const filteredResults = InternData?.ojt_attendance_attendance.filter(
      (item) =>
        (!formattedStartDate ||
          moment(item.date).isSameOrAfter(formattedStartDate)) &&
        (!formattedEndDate ||
          moment(item.date).isSameOrBefore(formattedEndDate))
    );
    setFilteredData(filteredResults);
    setDateRange(dates);
  };
  console.log(filteredData.length);

  const handleTableChange = (pagination, filters, sorter) => {
    setSortOrder(sorter.order);
  };

  const getSortOrder = (column) => {
    if (sortOrder && sortOrder.columnKey === column) {
      return sortOrder.order;
    }
    return null;
  };
  const styles = {
    title: {
      fontWeight: "bolder",
    },
  };
  return (
    <div className="h-full flex flex-col w-full">
      <Card className="mb-5 px-10 ">
        <div className="flex    lg:flex-row lg:gap-24 sm:gap-8  items-center sm:flex-col  justify-start w-full flex-row">
          <div className=" ml-11">
            <Typography.Title
              className="block "
              level={4}
              style={{ margin: 0, ...styles.title }}
            >
              Intern Logs
            </Typography.Title>
          </div>
          <div className="block lg:flex items-center">
            <DatePicker.RangePicker onChange={filterDateRangeTable} />
          </div>
        </div>
      </Card>
      <Table
        dataSource={
          dateRange && dateRange.length > 0 && filteredData.length > 0
            ? filteredData
            : !loading && InternData?.ojt_attendance_attendance
        }
        columns={columns}
      />
    </div>
  );
}

export default Internlogs;
