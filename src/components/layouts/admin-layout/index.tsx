import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { MdOutlineTopic } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../atoms/button/Button";
import { BookOutlined, CalendarOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "../../../redux/features/userSlice";
import { FcDataConfiguration } from "react-icons/fc";
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
  getItem("Config", "config", <SettingOutlined />),
  getItem("User", "user", <UserOutlined />),
  getItem("Topic", "topic", <BookOutlined />),
  getItem("Semester", "semester", <CalendarOutlined />),
];
const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out");
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          className="menu-sidebar"
          style={{
            height: "100%",
          }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
        <div className="w-full menu-sidebar flex justify-center">
          <Button
            onClick={handleLogout}
            styleClass="h-[51px] w-[51px]  mb-12 text-white flex justify-center items-center bg-gradient-to-b from-[#504C51] to-[#323033]"
          >
            <LogoutOutlined className="text-[18px] stroke-white stroke-[10px]" />
          </Button>
        </div>
      </Sider>
      <Layout
        style={{
          overflowY: "auto",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
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
