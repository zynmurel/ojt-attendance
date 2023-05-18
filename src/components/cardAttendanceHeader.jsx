import React from "react";
import { Card, Space, DatePicker, Typography, Input, Button } from "antd";
import { AiOutlineFileExcel } from "react-icons/ai";

const { RangePicker } = DatePicker;

const { Title } = Typography;
const { Search } = Input;

const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};
const onOk = (value) => {
  console.log("onOk: ", value);
};
const onSearch = (value) => console.log(value);

function CardAttendanceHeader() {
  return (
    <Card className=" w-full h-22 " direction="horizontal">
      <div className=" flex flex-row gap-20    items-center    ">
        <Title level={3}>Intern Attendance</Title>

        <RangePicker
          className=" h-9   text-black   "
          format="YYYY-MM-DD "
          onChange={onChange}
          onOk={onOk}
        />

        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />

        <Button
          style={{ backgroundColor: "#a8acb4" }}
          className=" flex flex-row  items-center h-12  w-50 "
        >
          <AiOutlineFileExcel className=" mr-5  " fontSize={30} />
          <div> Export Excel </div>
        </Button>
      </div>
    </Card>
  );
}

export default CardAttendanceHeader;
