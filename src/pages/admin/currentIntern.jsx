import { useQuery } from "@apollo/client";
import { Card, Typography } from "antd";
// ant d UI for design
import React from "react";
import { GET_INTERN } from "../../graphql/query";

//typography Title
const { Title } = Typography;
// meta is a sub compnent of card
const { Meta } = Card;
function CurrentIntern() {
  // Get_User Query Data
  const { data, loading, error } = useQuery(GET_INTERN);
  return (
    <div className=" flex justify-start w-full flex-col">
      <Title
        level={3}
        className=" bg-white rounded-lg w-64 m-8 p-2 text-center"
      >
        Current Interns
      </Title>
      <div className="flex w-full  mt-10 flex-row flex-wrap">
        {data &&
          data.ojt_attendance_user.map((intern) => (
            <div className="flex flex-col m-3 w-64 h-96 bg-white hover:drop-shadow-2xl	 cursor-pointer hover:scale-105 ease-in duration-100 rounded">
              <div className=" h-full rounded flex items-center  overflow-hidden">
                <img
                  src={intern.profile_pic}
                  alt="Sample Images"
                  className=" w-full rounded"
                />
              </div>
              <div className=" w-full m-h-24 self-end p-5">
                <p className=" text-sm my-0 ">{intern.first_name}</p>
                <p className=" m-0 text-sm">
                  Hours to render: {intern.hours_to_render}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CurrentIntern;
