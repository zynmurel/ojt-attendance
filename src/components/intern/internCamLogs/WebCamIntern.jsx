import { useMutation } from "@apollo/client";
import Webcam from "react-webcam";
import {
  INSERT_INTERN_ATTENDANCE,
  UPDATE_AM_OUT,
  UPDATE_PM_IN,
  UPDATE_PM_OUT,
} from "../../../graphql/mutation";
import { Button } from "antd";
import { useAuth } from "../../../hooks/Auth";
import { ableInButton, ableOutButton } from "../../../helper/activeButton";

const WebCamIntern = ({
  date,
  time,
  refetch,
  attendanceData,
  attendaceLoading,
}) => {
  const { internId } = useAuth();
  const toRefetch = () => {
    return {
      onCompleted() {
        refetch();
      },
    };
  };
  const [addAttendance] = useMutation(INSERT_INTERN_ATTENDANCE, toRefetch());
  const [updateAmOut] = useMutation(UPDATE_AM_OUT, toRefetch());
  const [updatePmIn] = useMutation(UPDATE_PM_IN, toRefetch());
  const [updatePmOut] = useMutation(UPDATE_PM_OUT, toRefetch());
  const onSubmitLog = (screenshot, dataArray, date, time) => {
    if (dataArray.length === 0) {
      addAttendance({
        variables: {
          date: date,
          total_rendered: null,
          in_am: time,
          in_pm: null,
          out_am: null,
          out_pm: null,
          am_in_img: screenshot,
          am_out_img: null,
          pm_in_img: null,
          pm_out_img: null,
          intern_id: internId,
        },
      });
    } else if (dataArray[0].out_am === null) {
      updateAmOut({
        variables: {
          id: dataArray[0].id,
          img: screenshot,
          time: time,
        },
      });
    } else if (dataArray[0].in_pm === null) {
      updatePmIn({
        variables: {
          id: dataArray[0].id,
          img: screenshot,
          time: time,
        },
      });
    } else if (dataArray[0].out_pm === null) {
      updatePmOut({
        variables: {
          id: dataArray[0].id,
          img: screenshot,
          time: time,
        },
      });
    }
  };
  const dataArray = attendanceData?.ojt_attendance_attendance;
  const activeInButton = ableInButton(dataArray);
  const activeOutButton = ableOutButton(dataArray, activeInButton);

  const videoConstraints = {
    width: 1000,
    height: 720,
    facingMode: "environment",
  };
  return (
    <Webcam width={380} videoConstraints={videoConstraints} mirrored={true}>
      {({ getScreenshot }) => (
        <div
          className=" flex flex-row justify-between my-3"
          style={{ width: 380 }}
        >
          <Button
            className=" w-36"
            disabled={activeInButton || attendaceLoading}
            onClick={() => {
              onSubmitLog(getScreenshot(), dataArray, date, time);
            }}
          >
            Time In
          </Button>
          <Button
            className=" w-36"
            disabled={activeOutButton || attendaceLoading}
            onClick={() => onSubmitLog(getScreenshot(), dataArray, date, time)}
          >
            Time Out
          </Button>
        </div>
      )}
    </Webcam>
  );
};

export default WebCamIntern;
