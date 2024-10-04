import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { getLabel, mentorMenuItems } from "../../../constants/menuItems";
import Header from "../../organisisms/header";

const { Content, Footer, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [currentItem, setCurrentItem] = useState(mentorMenuItems[0]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={mentorMenuItems}
          onClick={(e) => setCurrentItem(e)}
        />
      </Sider>
      <Layout style={{ padding: "0 26px", background: colorBgContainer }}>
        <Header title={getLabel(currentItem?.key)} />
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
