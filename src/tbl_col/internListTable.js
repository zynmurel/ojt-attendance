import { Image } from "antd";
import moment from "moment";

export const columns = [
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
