//third party libraries
import { useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineFileAdd,
  AiOutlineDashboard,
  AiOutlineFileSearch,
  AiOutlineClockCircle,
  AiOutlineCamera,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { CloseOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { Button, Drawer, Image, Menu, theme } from "antd";

import { useAuth } from "../../hooks/Auth";

const LayoutContent = ({ collapsed, setCollapsed, isMobileView }) => {
  const navigate = useNavigate();
  // user auth
  const { userRole, logout } = useAuth();
  const location = useLocation();
  const {
    token: { colorBgBase, colorWarning },
  } = theme.useToken();
  const imgSrc = "/DigitalImage.jpg";
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
        <Sider style={{ backgroundColor: colorBgBase }} collapsed={collapsed}>
          <div className=" flex flex-col h-screen">
            <Image
              preview={false}
              width={190}
              className=" mt-5 mx-2"
              src={imgSrc}
            />

            <Menu
              defaultSelectedKeys={[`${location.pathname}`]}
              items={items}
              onClick={handleMenuclick}
              mode="inline"
              style={{
                backgroundColor: colorBgBase,
                paddingTop: "2.5rem",
              }}
            />
            <Button
              type="text"
              style={{ color: colorWarning }}
              className="text-sm flex items-center justify-center gap-2 mx-auto  mt-auto mb-5 w-full"
              onClick={() => logout()}
            >
              Logout
              <BiLogOut fontSize={20} />
            </Button>
          </div>
        </Sider>
      ) : (
        <Drawer
          title={
            <div className="flex w-full justify-center items-center">
              <Image
                preview={false}
                className=" w-full mt-5 mx-2"
                src={imgSrc}
              />
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
            <Button
              type="text"
              style={{ color: colorWarning }}
              className=" text-sm flex items-center justify-center gap-2 mx-auto  mt-auto mb-5 w-full"
              onClick={() => logout()}
            >
              Logout
              <BiLogOut fontSize={20} />
            </Button>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default LayoutContent;
