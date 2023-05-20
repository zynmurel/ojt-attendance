import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ATTENDACE_BY_INTERN } from "../../graphql/query";
import { useAuth } from "../../hooks/Auth";
import moment from "moment";
import WebCamIntern from "../../components/intern/internCamLogs/WebCamIntern";
import InternLogsTable from "../../components/intern/internCamLogs/InternLogsTable";
const InternCamLogs = () => {
  const { internId } = useAuth();
  const date = moment().format("L");
  const time = moment().format();
  const [
    getAttendanceByIntern,
    {
      data: attendanceData,
      error: attendanceError,
      loading: attendaceLoading,
      refetch,
    },
  ] = useLazyQuery(GET_ATTENDACE_BY_INTERN);

  useEffect(() => {
    getAttendanceByIntern({
      variables: {
        date: date,
        intern_id: internId,
      },
    });
    refetch();
  }, [attendanceData]);

  return (
    <div className="flex justify-center flex-col  max-h-screen min-w-min">
      <div className="flex flex-col items-center">
        <h1 className="">Camera View</h1>
        <WebCamIntern
          date={date}
          time={time}
          refetch={refetch}
          attendanceData={attendanceData}
          attendaceLoading={attendaceLoading}
        />
      </div>
      <InternLogsTable attendanceData={attendanceData} />
    </div>
  );
};

export default InternCamLogs;
