import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";

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

export const mentorMenuItems: MenuItem[] = [
  getItem("Topic", "topic", <PieChartOutlined />),
  getItem("Food", "food", <PieChartOutlined />),
  getItem("Product", "product", <PieChartOutlined />),
  getItem("Voucher", "voucher", <PieChartOutlined />),
];
