import { useNavigate, useOutlet } from "react-router-dom";

import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  AiOutlineFileAdd,
  AiOutlineDashboard,
  AiOutlineFileSearch,
} from "react-icons/ai";
import { useAuth } from "../hooks/Auth";

const DashboardLayout = () => {
  const { userRole } = useAuth();
  console.log(userRole);

  const outlet = useOutlet();
  const navigate = useNavigate();
  const admin = [
    getItem(<AiOutlineDashboard />, "Dashboard", "/admin"),
    getItem(<AiOutlineFileAdd />, "Add Intern", "/admin/add-intern"),
  ];
  const intern = [
    getItem(<AiOutlineFileSearch />, "Intern List", "/intern/intern-list"),
  ];
  const items = userRole === "admin" ? admin : intern;
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
            <img className=" w-28" src="/InternAttendance.jpg" />
          </Header>
          <Content className=" p-8" style={{ background: "#989ca4" }}>
            {outlet}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
