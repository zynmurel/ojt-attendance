import { useMutation } from "@apollo/client";
import Webcam from "react-webcam";
import {
  INSERT_INTERN_ATTENDANCE,
  UPDATE_AM_OUT,
  UPDATE_PM_IN,
  UPDATE_PM_OUT,
} from "../../../graphql/mutation";
import { Button, Skeleton } from "antd";
import { useAuth } from "../../../hooks/Auth";
import { ableInButton, ableOutButton } from "../../../helper/activeButton";
import moment from "moment";

const WebCamIntern = ({
  date,
  refetch,
  attendanceData,
  attendaceLoading,
  openSuccessLogAttendance,
}) => {
  const { internId } = useAuth();

  const videoConstraints = {
    width: 1000,
    height: 720,
    facingMode: "environment",
  };
  const styles = {
    buttonParentWidth: {
      width: 380,
    },
    skeleW: { width: 100 },
  };

  const toRefetch = () => {
    return {
      onCompleted() {
        refetch();
        openSuccessLogAttendance(
          "success",
          "You have successfully timed in/out!"
        );
      },
    };
  };
  const computeHoursRendered = (rendered, ampm, time) => {
    const in_time = moment(dataArray[0][`${ampm}`]).format("hh:mm").split(":");
    const out_time = moment(time).format("HH:mm").split(":");
    const diffhours = out_time[0] - in_time[0];
    const isMore = +in_time[1] > +out_time[1];
    const hours = isMore ? diffhours - 1 : diffhours;
    const mins = isMore
      ? +out_time[1] + (60 - in_time[1])
      : out_time[1] - in_time[1];
    const amTotal = `${hours}:${mins}`;
    if (!rendered) {
      return amTotal;
    }
    const splitRendered = rendered.split(":");
    const splitAmTotal = amTotal.split(":");
    const pmHrTotal = +splitAmTotal[0] + +splitRendered[0];
    const pmMinTotal = +splitAmTotal[1] + +splitRendered[1];
    console.log("splitAm", splitAmTotal);
    console.log("splitRender", splitRendered);
    console.log("pm min total", pmMinTotal);
    console.log("pm hr total", pmHrTotal);
    const pmHr = pmMinTotal >= 60 ? pmHrTotal + 1 : pmHrTotal;
    const pmMin = pmMinTotal >= 60 ? pmMinTotal - 60 : pmMinTotal;
    const pmTotal = `${pmHr}:${pmMin}`;
    return pmTotal;
  };
  const [addAttendance] = useMutation(INSERT_INTERN_ATTENDANCE, toRefetch());
  const [updateAmOut] = useMutation(UPDATE_AM_OUT, toRefetch());
  const [updatePmIn] = useMutation(UPDATE_PM_IN, toRefetch());
  const [updatePmOut] = useMutation(UPDATE_PM_OUT, toRefetch());
  const onSubmitLog = (screenshot, dataArray, date) => {
    const time = moment().format();
    if (dataArray?.length === 0) {
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
    } else if (dataArray?.[0].out_am === null) {
      updateAmOut({
        variables: {
          id: dataArray[0].id,
          img: screenshot,
          time: time,
          rendered: computeHoursRendered(
            dataArray[0].total_rendered,
            "in_am",
            time
          ),
        },
      }).then(() => {
        console.log(
          "here",
          computeHoursRendered(dataArray[0].total_rendered, "in_am", time)
        );
      });
    } else if (dataArray?.[0].in_pm === null) {
      updatePmIn({
        variables: {
          id: dataArray[0].id,
          img: screenshot,
          time: time,
        },
      });
    } else if (dataArray?.[0].out_pm === null) {
      updatePmOut({
        variables: {
          id: dataArray[0].id,
          img: screenshot,
          time: time,
          rendered: computeHoursRendered(
            dataArray[0].total_rendered,
            "in_pm",
            time
          ),
        },
      }).then(() => {
        console.log(
          "here",
          computeHoursRendered(dataArray[0].total_rendered, "in_pm", time)
        );
      });
    }
  };

  const dataArray = attendanceData?.ojt_attendance_attendance;
  const activeInButton = ableInButton(dataArray);
  const activeOutButton = ableOutButton(dataArray, activeInButton);
  return (
    <Webcam width={380} videoConstraints={videoConstraints} mirrored={true}>
      {({ getScreenshot }) => (
        <div
          className=" flex flex-row justify-between my-3"
          style={styles.buttonParentWidth}
        >
          <Button
            className=" w-36"
            disabled={attendaceLoading || activeInButton}
            onClick={() => onSubmitLog(getScreenshot(), dataArray, date)}
          >
            Time In
          </Button>
          <Button
            className=" w-36"
            disabled={attendaceLoading || activeOutButton}
            onClick={() => onSubmitLog(getScreenshot(), dataArray, date)}
          >
            Time Out
          </Button>
        </div>
      )}
    </Webcam>
  );
};

export default WebCamIntern;
