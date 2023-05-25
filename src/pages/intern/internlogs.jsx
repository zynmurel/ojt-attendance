import React, { useEffect } from "react";
import { Card, Typography, DatePicker, Table, Image } from "antd";
import { useState } from "react";
import { useAuth } from "../../hooks/Auth";
import { columns } from "../../tbl_col/internColumn";
import { useLazyQuery } from "@apollo/client";
import { INTERN_LOGS } from "../../graphql/query";

function Internlogs() {
  const { internId } = useAuth();
  const [datePicked, setDatePicked] = useState(null);
  let condition = `{ intern_id: { _eq: $intern_id } }`;
  if (datePicked) {
    condition = `{_and:[{ intern_id: { _eq: $intern_id } }, {date:{_gte:"${datePicked?.[0].format(
      "MM/DD/YYYY"
    )}"}}, {date:{_lte:"${datePicked?.[1].format("MM/DD/YYYY")}"}}]}`;
  }
  const [getInternLogs, { data }] = useLazyQuery(INTERN_LOGS(condition));
  useEffect(() => {
    getInternLogs({
      variables: {
        intern_id: internId,
      },
    });
  }, [datePicked, data]);
  const styles = {
    title: {
      fontWeight: "bolder",
    },
  };
  return (
    <div className="h-full flex flex-col w-full">
      <Card className="mb-5 px-10 ">
        <div className="flex    lg:flex-row lg:gap-24 sm:gap-8  items-center sm:flex-col  justify-start w-full flex-row">
          <div className="">
            <Typography.Title
              className="block "
              level={4}
              style={{ margin: 0, ...styles.title }}
            >
              Intern Logs
            </Typography.Title>
          </div>
          <div className="block lg:flex items-center">
            <DatePicker.RangePicker onChange={setDatePicked} />
          </div>
        </div>
      </Card>
      <Card>
        <Table columns={columns} dataSource={data?.ojt_attendance_attendance} />
      </Card>
    </div>
  );
}

export default Internlogs;
