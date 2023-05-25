import { useLocation, useNavigate } from "react-router-dom";

import {
  AiOutlineFileAdd,
  AiOutlineDashboard,
  AiOutlineFileSearch,
  AiOutlineClockCircle,
  AiOutlineCamera,
} from "react-icons/ai";

import { CloseOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { Button, Drawer, Menu } from "antd";
import { useAuth } from "../../hooks/Auth";
const LayoutContent = ({ collapsed, setCollapsed, isMobileView }) => {
  const navigate = useNavigate();
  // user auth
  const { userRole, logout } = useAuth();
  const location = useLocation();
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
  // functions
  const hadelDrawerOnClose = () => {
    setCollapsed(true);
  };
  const handleMenuMobileClick = ({ key }) => {
    navigate(key);
    hadelDrawerOnClose();
  };
  return (
    <>
      {isMobileView ? (
        <Sider style={{ backgroundColor: "#ffff" }} collapsed={collapsed}>
          <div className=" flex flex-col h-screen">
            <img className=" w-full mt-5 " src="/DigitalImage.jpg" />

            <Menu
              defaultSelectedKeys={[`${location.pathname}`]}
              items={items}
              onClick={handleMenuclick}
              mode="inline"
              style={{
                backgroundColor: "#ffff",
                paddingTop: "2.5rem",
              }}
            />
          </div>
        </Sider>
      ) : (
        <Drawer
          title={
            <div className="flex w-full justify-center items-center">
              <img className=" w-full mt-5 " src="/DigitalImage.jpg" />
            </div>
          }
          placement="left"
          open={!collapsed}
          width="100%"
          onClose={hadelDrawerOnClose}
          closable={false}
          extra={
            <Button
              type="text"
              className="mr-2"
              danger
              onClick={hadelDrawerOnClose}
            >
              <CloseOutlined className=" text-lg" />
            </Button>
          }
        >
          <div className=" flex flex-col h-full">
            <Menu
              mode="inline"
              items={items}
              onClick={handleMenuMobileClick}
              defaultSelectedKeys={[`${location.pathname}`]}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default LayoutContent;
