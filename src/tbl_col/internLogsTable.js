import { Image } from "antd";
import moment from "moment";

export default [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (time) => <>{moment(time).format("LT")}</>,
  },
  {
    title: "In/Out",
    dataIndex: "in_out",
    key: "in_out",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => {
      return (
        <Image
          src={image}
          alt={"attendance_pic"}
          width={80}
          style={{ margin: "-12px 0 -12px 0" }}
        />
      );
    },
  },
];
