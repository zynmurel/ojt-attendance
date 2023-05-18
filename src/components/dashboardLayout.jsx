import { useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  AiOutlineFileAdd,
  AiOutlineDashboard,
  AiOutlineFileSearch,
} from "react-icons/ai";

const DashboardLayout = () => {
  //   const [collapsed, setCollapsed] = useState(false);

  const outlet = useOutlet();
  const navigate = useNavigate();
  const items = [
    getItem(<AiOutlineDashboard />, "Dashboard", "/"),
    getItem(<AiOutlineFileAdd />, "Add Intern", "/admin/add-intern"),
    getItem(<AiOutlineFileSearch />, "Intern List", "/intern/intern-list"),
  ];
  function getItem(icon, label, key, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const handleMenuclick = ({ key }) => {
    navigate(key);
  };
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className="flex"
      >
        <Sider
          //   collapsed={collapsed}
          style={{ backgroundColor: "#ffff" }}
          //   onCollapse={(value) => setCollapsed(value)}
        >
          <img className=" w-full mt-5 " src="/DigitalImage.jpg" />

          <Menu
            defaultSelectedKeys={["/"]}
            items={items}
            onClick={handleMenuclick}
            mode="inline"
            style={{
              backgroundColor: "#ffff",
              paddingTop: "2.5rem",
            }}
          />
        </Sider>
        <Layout>
          <Header
            style={{ backgroundColor: "#ffff", padding: 0 }}
            className=" flex items-center justify-start"
          >
            <img className="  w-1/6  " src="/InternAttendance.jpg" />
          </Header>
          <Content className=" p-8 pb-20" style={{ background: "#989ca4" }}>
            {outlet}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
