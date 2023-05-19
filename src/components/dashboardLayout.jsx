import { useNavigate, useOutlet } from "react-router-dom";

import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  AiOutlineFileAdd,
  AiOutlineDashboard,
  AiOutlineFileSearch,
  AiOutlineClockCircle,
  AiOutlineCamera,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import { useAuth } from "../hooks/Auth";

const DashboardLayout = () => {
  const { userRole, logout } = useAuth();

  const outlet = useOutlet();
  const navigate = useNavigate();
  const admin = [
    getItem(<AiOutlineDashboard />, "Dashboard", "/admin"),
    getItem(<AiOutlineFileAdd />, "Add Intern", "/admin/add-intern"),
    getItem(<AiOutlineFileSearch />, "Intern List", "/admin/list-of-intern"),
  ];
  const intern = [
    getItem(<AiOutlineCamera />, "Camera View", "/intern"),
    getItem(<AiOutlineClockCircle />, "Intern Logs", "/intern/intern-logs"),
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
        <Sider style={{ backgroundColor: "#ffff" }}>
          <div className=" flex flex-col h-screen">
            <img className=" w-full mt-5 " src="/DigitalImage.jpg" />

            <Menu
              defaultSelectedKeys={[`/${userRole}`]}
              items={items}
              onClick={handleMenuclick}
              mode="inline"
              style={{
                backgroundColor: "#ffff",
                paddingTop: "2.5rem",
              }}
            />
            <Button
              type="text"
              className=" text-red-500 text-sm flex items-center justify-center gap-2 mx-auto  mt-auto mb-5 w-full"
              onClick={() => logout()}
            >
              Logout
              <BiLogOut fontSize={20} />
            </Button>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{ backgroundColor: "#ffff", padding: 0 }}
            className=" flex items-center justify-start"
          >
            <img className=" w-28" src="/InternAttendance.jpg" />
          </Header>
          <Content
            className=" p-8 overflow-auto h-96"
            style={{
              background: "#989ca4",
            }}
          >
            {outlet}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
