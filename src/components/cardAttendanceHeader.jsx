import React from "react";
import { Card, Space, DatePicker, Typography, Input, Button } from "antd";
import { AiOutlineFileExcel } from "react-icons/ai";

const { RangePicker } = DatePicker;

const { Title } = Typography;
const { Search } = Input;

const onSearch = (value) => console.log(value);

function CardAttendanceHeader() {
  return (
    <Card className=" w-full   h-18 mb-10 " direction="horizontal   ">
      <div className=" flex flex-row  gap-6    items-center    ">
        <Title level={3}>Intern Attendance</Title>

        <RangePicker className=" h-9   text-black   " format="YYYY-MM-DD " />

        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />

        <Button
          style={{ backgroundColor: "#a8acb4" }}
          className=" flex flex-row  items-center h-10  w-50 "
        >
          <AiOutlineFileExcel className=" mr-5  " fontSize={30} />
          <div> Export Excel </div>
        </Button>
      </div>
    </Card>
  );
}

export default CardAttendanceHeader;
