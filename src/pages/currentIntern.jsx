import { useQuery } from "@apollo/client";
import { Card, Typography } from "antd";
// ant d UI for design
import React from "react";
import { GET_INTERN } from "../graphql/query";

//typography Title
const { Title } = Typography;
// meta is a sub compnent of card
const { Meta } = Card;
function CurrentIntern() {
  // Get_User Query Data
  const { data, loading, error } = useQuery(GET_INTERN);
  return (
    <div className=" flex justify-start w-full">
      <div>
        <Card className="flex justify-start items-center p-0 w-44 h-9">
          <Title level={5} className=" m-0">
            Current Interns
          </Title>
        </Card>
        <div className=" grid grid-cols-4 py-5 gap-8">
          {data &&
            data.ojt_attendance_user.map((intern) => (
              <Card
                key={intern.id}
                style={{ width: 240 }}
                cover={<img src={intern.profile_pic} alt="Sample Images" />}
              >
                <Meta
                  title={intern.first_name}
                  description="Remaining Hour: 600"
                />
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CurrentIntern;
