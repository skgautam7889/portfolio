import React from "react";
import {
  BiUser,
  BiEnvelope,
  BiGroup,
  BiTrendingUp,
  BiTrendingDown,
} from "react-icons/bi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Visitors",
      value: "12,345",
      change: "+12.5%",
      icon: <BiGroup />,
      color: "#4e73df",
    },
    {
      title: "Subscribers",
      value: "1,284",
      change: "+8.2%",
      icon: <BiUser />,
      color: "#1cc88a",
    },
    {
      title: "Contacts",
      value: "456",
      change: "-2.4%",
      icon: <BiEnvelope />,
      color: "#f6c23e",
    },
    {
      title: "Conversion Rate",
      value: "3.45%",
      change: "+5.1%",
      icon: <BiTrendingUp />,
      color: "#e74a3b",
    },
  ];

  const chartData = [
    { month: "Jan", visitors: 4000, subscribers: 2400 },
    { month: "Feb", visitors: 3000, subscribers: 1398 },
    { month: "Mar", visitors: 5000, subscribers: 2800 },
    { month: "Apr", visitors: 2780, subscribers: 1908 },
    { month: "May", visitors: 6000, subscribers: 3800 },
    { month: "Jun", visitors: 4500, subscribers: 2500 },
  ];

  const pieData = [
    { name: "Chrome", value: 45 },
    { name: "Firefox", value: 25 },
    { name: "Safari", value: 20 },
    { name: "Edge", value: 10 },
  ];

  const COLORS = ["#4e73df", "#1cc88a", "#f6c23e", "#e74a3b"];

  return (
    <div className="dashboard-page">
      <h2 className="page-title">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-6">
            <div className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h5>{stat.title}</h5>
                <h2>{stat.value}</h2>
                <span
                  className={`stat-change ${stat.change.includes("-") ? "negative" : "positive"}`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="chart-card">
            <h5>Visitors & Subscribers Trends</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visitors" fill="#4e73df" />
                <Bar dataKey="subscribers" fill="#1cc88a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="chart-card">
            <h5>Browser Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
