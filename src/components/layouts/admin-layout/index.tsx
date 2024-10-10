import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { MdOutlineTopic } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/admin/${key}`}> {label} </Link>,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem("User", "user", <SlCalender />),
  getItem("Topic", "topic", <MdOutlineTopic />),
  getItem("Semester", "semester", <SlCalender />),
]; // param 1 : name ; param 2 : key ; param 3 : icon
const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          style={{
            height: "100%",
          }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout
        style={{
          overflowY: "auto",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
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
          Mentor Bridge ©{new Date().getFullYear()} Created by Thịnh Nhi Trân
          Đạt Minh
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
