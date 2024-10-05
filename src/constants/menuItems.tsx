import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Key } from "react";

export type MenuItem = Required<MenuProps>["items"][number];

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
    label: <Link to={`/dashboard/${key}`}> {label} </Link>,
  } as MenuItem;
}

export const getLabel = (key?: Key): string | undefined => {
  return mentorItems.find((item) => item.key === key)?.label;
};

export const adminMenuItems: MenuItem[] = [
  getItem("Topic", "topic", <PieChartOutlined />),
  getItem("Food", "food", <PieChartOutlined />),
  getItem("Product", "product", <PieChartOutlined />),
  getItem("Voucher", "voucher", <PieChartOutlined />),
];

export const studentMenuItems: MenuItem[] = [
  getItem("Topic", "topic", <PieChartOutlined />),
  getItem("Food", "food", <PieChartOutlined />),
  getItem("Product", "product", <PieChartOutlined />),
  getItem("Voucher", "voucher", <PieChartOutlined />),
];

const mentorItems = [
  { label: "Trang Chủ", key: "home", icon: <HomeOutlined /> },
  { label: "Lịch Trình", key: "schedule", icon: <CalendarOutlined /> },
  { label: "Xử Lí Yêu Cầu", key: "request", icon: <SnippetsOutlined /> },
  { label: "Cài Đặt", key: "setting", icon: <SettingOutlined /> },
];

export const mentorMenuItems: MenuItem[] = mentorItems.map((item) =>
  getItem(item.label, item.key, item.icon)
);
