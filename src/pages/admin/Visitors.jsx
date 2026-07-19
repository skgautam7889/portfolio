import React, { useState } from "react";
import { BiSearch, BiFilter, BiDownload } from "react-icons/bi";

const Visitors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const visitors = [
    {
      id: 1,
      ip: "192.168.1.1",
      location: "New York, US",
      pages: 5,
      duration: "5m 23s",
      device: "Desktop",
      date: "2024-01-15",
    },
    {
      id: 2,
      ip: "192.168.1.2",
      location: "London, UK",
      pages: 3,
      duration: "2m 15s",
      device: "Mobile",
      date: "2024-01-15",
    },
    {
      id: 3,
      ip: "192.168.1.3",
      location: "Tokyo, JP",
      pages: 7,
      duration: "8m 42s",
      device: "Desktop",
      date: "2024-01-14",
    },
    {
      id: 4,
      ip: "192.168.1.4",
      location: "Sydney, AU",
      pages: 2,
      duration: "1m 30s",
      device: "Tablet",
      date: "2024-01-14",
    },
    {
      id: 5,
      ip: "192.168.1.5",
      location: "Berlin, DE",
      pages: 4,
      duration: "3m 45s",
      device: "Desktop",
      date: "2024-01-13",
    },
  ];

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.ip.includes(searchTerm) ||
      visitor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.device.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="data-page">
      <div className="page-header">
        <h2>Visitors</h2>
        <div className="header-actions">
          <button className="btn btn-outline-secondary me-2">
            <BiFilter /> Filter
          </button>
          <button className="btn btn-success">
            <BiDownload /> Export
          </button>
        </div>
      </div>

      <div className="search-bar">
        <BiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search visitors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Pages</th>
              <th>Duration</th>
              <th>Device</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map((visitor, index) => (
              <tr key={visitor.id}>
                <td>{index + 1}</td>
                <td>{visitor.ip}</td>
                <td>{visitor.location}</td>
                <td>{visitor.pages}</td>
                <td>{visitor.duration}</td>
                <td>
                  <span
                    className={`badge ${
                      visitor.device === "Desktop"
                        ? "bg-primary"
                        : visitor.device === "Mobile"
                          ? "bg-success"
                          : "bg-warning"
                    }`}
                  >
                    {visitor.device}
                  </span>
                </td>
                <td>{visitor.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Visitors;
