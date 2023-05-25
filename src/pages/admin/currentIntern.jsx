import { useQuery } from "@apollo/client";
import { Image, Skeleton, Typography, message } from "antd";
// ant d UI for design
import React, { useEffect } from "react";
import { GET_INTERN } from "../../graphql/query";

const { Title } = Typography;
function CurrentIntern() {
  const dummySkeletonUser = [1, 2, 3, 4];
  // Get_User Query Data
  const { data, loading, refetch } = useQuery(GET_INTERN);

  useEffect(() => {
    refetch();
  }, []);

  const computeHrMn = (intern) => {
    let timeRendered;
    intern.attendances.map((time) => {
      const timeSplit = time.total_rendered
        ? time.total_rendered?.split(":")
        : ["0", "0"];
      if (!timeRendered) {
        timeRendered = timeSplit;
      } else {
        timeRendered = [
          +timeRendered[0] + +timeSplit[0],
          +timeRendered[1] + +timeSplit[1],
        ];
      }
    });
    let hr = +intern.hours_to_render;
    let min = 0;
    if (timeRendered?.[1] >= 60) {
      const excessHr = Math.floor(timeRendered[1] / 60);
      timeRendered = [
        `${timeRendered[0] + excessHr}`,
        `${timeRendered[1] % 60}`,
      ];
    }
    if (timeRendered) {
      hr = intern.hours_to_render - +timeRendered?.[0];
      if (+timeRendered?.[1] > 0) {
        hr = hr - 1;
        min = 60 - timeRendered?.[1];
      }
    }
    return [hr, min];
  };
  return (
    <div className=" flex justify-start w-full flex-col">
      <div className=" w-full flex justify-center sm:justify-start">
        <Title
          level={3}
          className=" bg-white rounded-lg w-64  p-2 text-center m-4"
        >
          Current Interns
        </Title>
      </div>
      <div className="flex w-full  mt-10 flex-row flex-wrap  justify-center md:justify-start">
        {loading && (
          <div className="flex w-full  mt-10 flex-row flex-wrap gap-5">
            {dummySkeletonUser.map((_) => (
              <Skeleton.Avatar key={_} active shape="square" size={275} />
            ))}
          </div>
        )}
        {data &&
          !loading &&
          data.ojt_attendance_user.map((intern) => {
            const time = computeHrMn(intern);
            let fullname = intern.first_name + " " + intern.last_name;
            return (
              <div
                key={intern.id}
                className="flex flex-col m-3 w-64 h-96 bg-white hover:drop-shadow-2xl	 cursor-pointer hover:scale-105 ease-in duration-100 rounded"
              >
                <div className=" h-full rounded flex items-center  overflow-hidden">
                  <Image
                    preview={false}
                    src={intern.profile_pic}
                    alt="Sample Images"
                    className=" w-full h-full rounded object-cover"
                  />
                </div>
                <div className=" w-full m-h-24 self-end p-5">
                  <Typography.Text className="capitalize text-lg font-bold">
                    {fullname}
                  </Typography.Text>
                  <p className=" m-0 text-sm">
                    {`Hours to render: ${time[0]}hrs ${time[1]}mins`}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CurrentIntern;
