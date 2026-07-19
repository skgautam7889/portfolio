import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { BiGridAlt, BiUser, BiEnvelope, BiGroup } from "react-icons/bi";
// import "./AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: <BiGridAlt />, label: "Dashboard" },
    { path: "/admin/subscribers", icon: <BiUser />, label: "Subscribers" },
    { path: "/admin/contacts", icon: <BiEnvelope />, label: "Contacts" },
    { path: "/admin/visitors", icon: <BiGroup />, label: "Visitors" },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <nav className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <h3>Admin Panel</h3>
        </div>

        <ul className="sidebar-nav">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                onClick={closeSidebar}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Main Content */}
      <div className="admin-content">
        {/* <AdminHeader /> */}
        <div className="admin-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
