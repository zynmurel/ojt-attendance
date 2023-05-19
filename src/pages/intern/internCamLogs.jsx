import { Button } from "antd";
import { useState } from "react";
import Webcam from "react-webcam";
const InternCamLogs = () => {
  const [capturedPhoto, setCapturedPhoto] = useState("");
  const videoConstraints = {
    width: 1000,
    height: 720,
    facingMode: "environment",
  };
  return (
    <div className="flex justify-center  h-full">
      <div className="flex flex-col items-center">
        <h1 className="">Camera View</h1>
        <Webcam width={380} videoConstraints={videoConstraints} mirrored={true}>
          {({ getScreenshot }) => (
            <div className=" flex flex-row justify-between w-full my-3">
              <Button
                className=" w-36"
                onClick={() => {
                  getScreenshot();
                  console.log(getScreenshot());
                }}
              >
                Time In
              </Button>
              <Button className=" w-36">Time Out</Button>
            </div>
          )}
        </Webcam>
      </div>
    </div>
  );
};

export default InternCamLogs;
