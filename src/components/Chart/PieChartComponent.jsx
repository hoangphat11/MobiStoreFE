import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { useUsers } from "../../hooks/useUsers";
import { useProducts } from "../../hooks/useProducts";
import { useOrders } from "../../hooks/useOrders";

const DashboardChart = () => {
  const { listUsers, isLoading: loadingUsers } = useUsers();
  const { listProducts, isLoading: loadingProducts } = useProducts();
  const { listOrders, isLoading: loadingOrders } = useOrders();

  if (loadingUsers || loadingProducts || loadingOrders) {
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Đang tải Dashboard...
      </p>
    );
  }

  const totalUsers = listUsers?.length || 0;
  const totalProducts = listProducts?.length || 0;
  const totalOrders = listOrders?.length || 0;

  const data = [
    { name: "Users", total: totalUsers },
    { name: "Products", total: totalProducts },
    { name: "Orders", total: totalOrders },
  ];

  const colors = ["#1890ff", "#52c41a", "#fa8c16"];

  return (
    <div style={{ padding: "24px", background: "#f5f6fa", minHeight: "100vh" }}>
      {/* Thẻ tổng quan */}
      <h1>Dashboard</h1>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Statistic
              title="Tổng số Users"
              value={totalUsers}
              prefix={
                <div
                  style={{
                    background: "#e6f7ff",
                    borderRadius: "50%",
                    padding: "8px",
                    marginRight: "8px",
                  }}
                >
                  <UserOutlined style={{ color: "#1890ff" }} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Statistic
              title="Tổng số Products"
              value={totalProducts}
              prefix={
                <div
                  style={{
                    background: "#f6ffed",
                    borderRadius: "50%",
                    padding: "8px",
                    marginRight: "8px",
                  }}
                >
                  <ShoppingOutlined style={{ color: "#52c41a" }} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Statistic
              title="Tổng số Orders"
              value={totalOrders}
              prefix={
                <div
                  style={{
                    background: "#fff7e6",
                    borderRadius: "50%",
                    padding: "8px",
                    marginRight: "8px",
                  }}
                >
                  <ShoppingCartOutlined style={{ color: "#fa8c16" }} />
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ cột */}
      <Card
        title="Thống kê số lượng Users - Products - Orders"
        bordered={false}
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="total" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default DashboardChart;
