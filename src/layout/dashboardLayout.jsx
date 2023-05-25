import React, { useEffect, useState } from "react";

import { useOutlet } from "react-router-dom";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Grid, Image, Layout, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import LayoutContent from "../components/layout/layoutContent";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

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
      <Layout className="min-h-screen">
        <LayoutContent
          collapsed={collapsed}
          isMobileView={isMobileView}
          setCollapsed={setCollapsed}
        />
        <Layout>
          <Header
            style={{ backgroundColor: colorBgBase, padding: 0 }}
            className=" flex items-center justify-start"
          >
            <div className="flex justify-between md:justify-start w-full p-3 items-center">
              {!isMobileView &&
                React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: toggleSideBar,
                  }
                )}
              <Image
                preview={false}
                width={120}
                className=" flex sm:justify-end"
                src={imgSrc}
              />
            </div>
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
    </>
  );
};

export default DashboardLayout;
