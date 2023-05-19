import { Card, Typography } from "antd";
// ant d UI for design
import React from "react";
//typography Title
const { Title } = Typography;
// meta is a sub compnent of card
const { Meta } = Card;
function CurrentIntern() {
  return (
    <div className=" flex justify-start h-screen w-full">
      <div>
        <Card className="flex justify-start items-center p-0 w-44 h-9">
          <Title level={5} className=" m-0">
            Current Interns
          </Title>
        </Card>
        <div className=" grid grid-cols-4 py-5 gap-5">
          <Card
            style={{ width: 240 }}
            cover={<img src="/sample.jpg" alt="Sample Images" />}
          >
            <Meta title="Sean Comingues" description="Remaining Hour: 600" />
          </Card>
          <Card
            style={{ width: 240 }}
            cover={<img src="/sample.jpg" alt="Sample Images" />}
          >
            <Meta title="Cedric Candido" description="Remaining Hour: 600" />
          </Card>
          <Card
            style={{ width: 240 }}
            cover={<img src="/sample.jpg" alt="Sample Images" />}
          >
            <Meta
              title="Sonny Boy Fuenteblanca"
              description="Remaining Hour: 600"
            />
          </Card>
          <Card
            style={{ width: 240 }}
            cover={<img src="/sample.jpg" alt="Sample Images" />}
          >
            <Meta title="Eunice Balmes" description="Remaining Hour: 600" />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CurrentIntern;
