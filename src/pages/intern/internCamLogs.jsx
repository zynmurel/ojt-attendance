import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ATTENDACE_BY_INTERN } from "../../graphql/query";
import { useAuth } from "../../hooks/Auth";
import moment from "moment";
import WebCamIntern from "../../components/intern/internCamLogs/WebCamIntern";
import InternLogsTable from "../../components/intern/internCamLogs/InternLogsTable";
import { notification } from "antd";
const InternCamLogs = () => {
  const { internId } = useAuth();
  const date = moment().format("L");

  const [successLogNotif, contextHolder] = notification.useNotification();
  const openLogAttendanceNotif = (type, title, description) => {
    successLogNotif[type]({
      message: title,
      description: description,
    });
  };

  const [
    getAttendanceByIntern,
    { data: attendanceData, loading: attendaceLoading, refetch },
  ] = useLazyQuery(GET_ATTENDACE_BY_INTERN, {
    onError() {
      openLogAttendanceNotif("error", "Data not fetched");
    },
  });

  useEffect(() => {
    getAttendanceByIntern({
      variables: {
        date: date,
        intern_id: internId,
      },
    });
  }, [attendanceData, date, internId, getAttendanceByIntern]);

  return (
    <div className="flex justify-center flex-col  max-h-screen min-w-min">
      {contextHolder}
      <div className="flex flex-col items-center mb-6">
        <h1 className=" mt-0 text-lg">Camera View</h1>
        <WebCamIntern
          date={date}
          refetch={refetch}
          attendanceData={attendanceData}
          attendaceLoading={attendaceLoading}
          openLogAttendanceNotif={openLogAttendanceNotif}
        />
      </div>
      <InternLogsTable attendanceData={attendanceData} />
    </div>
  );
};

export default InternCamLogs;
