import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  PieChartOutlined,
  SnippetsOutlined,
  WechatOutlined,
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
    label: <Link to={`${key}`}> {label} </Link>,
  } as MenuItem;
}

export const getLabel = (key?: Key, role?: string): string | undefined => {
  if (role == "STUDENT") {
    return studentItems.find((item) => item.key === key)?.label;
  }

  if (role == "MENTOR") {
    return mentorItems.find((item) => item.key === key)?.label;
  }
  return undefined;
};

export const adminMenuItems: MenuItem[] = [
  getItem("Topic", "topic", <PieChartOutlined />),
  getItem("Food", "food", <PieChartOutlined />),
  getItem("Product", "product", <PieChartOutlined />),
  getItem("Voucher", "voucher", <PieChartOutlined />),
];

const studentItems = [
  { label: "Trang Chủ", key: "home", icon: <HomeOutlined /> },
  { label: "Đoạn chat", key: "messages", icon: <WechatOutlined /> },
  { label: "Lịch Trình", key: "schedule", icon: <CalendarOutlined /> },
  { label: "Đặt Lịch", key: "booking", icon: <BookOutlined /> },
];

export const studentMenuItems: MenuItem[] = studentItems.map((item) =>
  getItem(item.label, item.key, item.icon)
);

const mentorItems = [
  { label: "Trang Chủ", key: "home", icon: <HomeOutlined /> },
  { label: "Đoạn chat", key: "messages", icon: <WechatOutlined /> },
  { label: "Lịch Trình", key: "schedule", icon: <CalendarOutlined /> },
  {
    label: "Lịch trống trong kỳ",
    key: "empty-schedule",
    icon: <BookOutlined />,
  },
  {
    label: "Xử Lí Yêu Cầu",
    key: "booking-request",
    icon: <SnippetsOutlined />,
  },
];

export const mentorMenuItems: MenuItem[] = mentorItems.map((item) =>
  getItem(item.label, item.key, item.icon)
);
