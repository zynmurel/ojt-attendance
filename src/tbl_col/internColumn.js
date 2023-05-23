import { Image } from "antd";
import moment from "moment";

export const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time In",
    key: "in_am",
    render: (record) => {
      if (record.in_am !== null)
        return (
          <div className=" flex flex-row gap-3">
            {moment(record.in_am).format("hh:mm")}
            <Image
              src={record.am_in_img}
              alt="Profile"
              style={{ width: 40, height: 25 }}
            />
          </div>
        );
      else return <></>;
    },
  },
  {
    title: "Time Out",
    key: "out_am",
    render: (record) => {
      if (record.out_am !== null)
        return (
          <div className=" flex flex-row gap-3">
            {moment(record.out_am).format("hh:mm")}
            <Image
              src={record.am_out_img}
              alt="Profile"
              style={{ width: 40, height: 25 }}
            />
          </div>
        );
      else return <></>;
    },
  },
  {
    title: "Time In",
    key: "in_pm",
    render: (record) => {
      if (record.in_pm !== null)
        return (
          <div className=" flex flex-row gap-3">
            {moment(record.in_pm).format("hh:mm")}
            <Image
              src={record.pm_in_img}
              alt="Profile"
              style={{ width: 40, height: 25 }}
            />
          </div>
        );
      else return <></>;
    },
  },
  {
    title: "Time Out",
    key: "out_pm",
    render: (record) => {
      if (record.out_pm !== null)
        return (
          <div className=" flex flex-row gap-3">
            {moment(record.out_pm).format("hh:mm")}
            <Image
              src={record.pm_out_img}
              alt="Profile"
              style={{ width: 40, height: 25 }}
            />
          </div>
        );
      else return <></>;
    },
  },
];
