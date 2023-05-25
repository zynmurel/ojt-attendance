import { Table } from "antd";
import columns from "../../../tbl_col/internLogsTable";

const InternLogsTable = ({ attendanceData }) => {
  const dataSource = [];
  const pushAttendance = (time, inout, image) => {
    const attendance = attendanceData?.ojt_attendance_attendance[0];
    attendance?.[`${time}`] &&
      dataSource.push({
        date: attendance.date,
        time: attendance[`${time}`],
        in_out: inout,
        image: attendance[`${image}`],
        total_rendered: attendance.total_rendered,
      });
  };
  pushAttendance("in_am", "In (AM)", "am_in_img");
  pushAttendance("out_am", "Out (AM)", "am_out_img");
  pushAttendance("in_pm", "In (PM)", "pm_in_img");
  pushAttendance("out_pm", "Out (PM)", "pm_out_img");
  return (
    <Table
      className="w-full"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey={"in_out"}
    />
  );
};

export default InternLogsTable;
