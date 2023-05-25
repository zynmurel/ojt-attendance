import React, { createContext, useEffect, useState } from "react";

//third party libraries
import { useOutlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Grid, Image, Layout, notification, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import LayoutContent from "../components/layout/layoutContent";
import UserProfile from "./userProfile";

export const MyContext = createContext(0);

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  //notification
  const [successAddIntern, contextHolder] = notification.useNotification();
  const handleSuccessAddIntern = (type, message, description) => {
    successAddIntern[type]({
      message: message,
      description: description,
    });
  };

  //theme
  const {
    token: { colorBgLayout, colorBgBase },
  } = theme.useToken();
  const imgSrc = "/InternAttendance.jpg";
  const outlet = useOutlet();
  const screens = Grid.useBreakpoint();

  // useEffect
  useEffect(() => {
    if (screens.lg) {
      setCollapsed(false);
    } else if (screens.md) {
      setCollapsed(true);
    } else if (screens.sm) {
      setCollapsed(true);
    }
    if (screens.sm) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }, [screens]);
  const toggleSideBar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <MyContext.Provider value={{ handleSuccessAddIntern }}>
        <Layout className="min-h-screen">
          {contextHolder}
          <LayoutContent
            collapsed={collapsed}
            isMobileView={isMobileView}
            setCollapsed={setCollapsed}
          />
          <Layout>
            <Header
              style={{ backgroundColor: colorBgBase, padding: 0 }}
              className=" flex items-center justify-between"
            >
              <div className="flex justify-between sm:justify-end lg:justify-start p-3 items-center">
                {!isMobileView &&
                  React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: toggleSideBar,
                    }
                  )}
                <Image preview={false} width={140} src={imgSrc} />
              </div>
              <UserProfile />
            </Header>
            <Content
              className=" p-5 overflow-auto h-96"
              style={{
                background: colorBgLayout,
              }}
            >
              {outlet}
            </Content>
          </Layout>
        </Layout>
      </MyContext.Provider>
    </>
  );
};

export default DashboardLayout;
