import React from "react";
import { Card, Form, Typography, DatePicker } from "antd";
import TableInternLogs from "../../components/tableInternlogs";

function Internlogs() {
  const styles = {
    title: {
      fontWeight: "bolder",
    },
  };
  return (
    <div className="h-full flex flex-col w-full">
      <Card className="mb-5 px-10 ">
        <div className="flex lg:flex justify-between w-full flex-row">
          <div className=" ml-11">
            <Typography.Title
              className="block "
              level={4}
              style={{ margin: 0, ...styles.title }}
            >
              Intern Logs
            </Typography.Title>
          </div>
          <div className="block lg:flex items-center mr-96">
            <DatePicker.RangePicker />
          </div>
        </div>
      </Card>
      <TableInternLogs />
    </div>
  );
}

export default Internlogs;
