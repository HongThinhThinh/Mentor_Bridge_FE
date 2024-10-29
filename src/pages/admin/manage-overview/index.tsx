import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ManageOverview = () => {
  // Dữ liệu được truyền vào dưới dạng array
  const data = [
    {
      month: 12,
      year: 2024,
      totalRevenue: 926000,
    },
    {
      month: 10,
      year: 2024,
      totalRevenue: 426000,
    },
    {
      month: 11,
      year: 2024,
      totalRevenue: 226000,
    },
    {
      month: 9,
      year: 2024,
      totalRevenue: 126000,
    },
    // Bạn có thể thêm dữ liệu cho nhiều tháng khác nếu cần
  ];

  // Định dạng dữ liệu để hiển thị tháng theo định dạng dễ hiểu
  const formattedData = data.map((item) => ({
    name: `Tháng ${item.month}/${item.year}`, // Hiển thị tháng/năm trên trục X
    totalRevenue: item.totalRevenue, // Doanh thu để hiển thị trên trục Y
  }));
  const data2 = [
    { name: "Product A", revenue: 1200 },
    { name: "Product B", revenue: 980 },
    { name: "Product C", revenue: 750 },
    { name: "Product D", revenue: 620 },
    { name: "Product E", revenue: 540 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        flexDirection: "column",
      }}
    >
      <>
        <PieChart width={600} height={400}>
          <Pie
            data={data2}
            dataKey="revenue"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </>
      <h3>Doanh thu hàng tháng</h3>
      <BarChart width={600} height={300} data={formattedData}>
        <XAxis dataKey="name" stroke="#8884d8" /> {/* Hiển thị tháng/năm */}
        <YAxis /> {/* Hiển thị trục Y cho doanh thu */}
        <Tooltip /> Tooltip khi hover vào các thanh
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="totalRevenue" fill="#8884d8" barSize={30} />
      </BarChart>
    </div>
  );
};

export default ManageOverview;
