import React, { useState } from "react";
import { BiSearch, BiEdit, BiTrash, BiPlus } from "react-icons/bi";

const Subscribers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const subscribers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      date: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      date: "2024-01-14",
      status: "Active",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      date: "2024-01-13",
      status: "Inactive",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      date: "2024-01-12",
      status: "Active",
    },
    {
      id: 5,
      name: "Emma Brown",
      email: "emma@example.com",
      date: "2024-01-11",
      status: "Active",
    },
  ];

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="data-page">
      <div className="page-header">
        <h2>Subscribers</h2>
        <button className="btn btn-primary">
          <BiPlus /> Add Subscriber
        </button>
      </div>

      <div className="search-bar">
        <BiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search subscribers..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map((sub, index) => (
              <tr key={sub.id}>
                <td>{index + 1}</td>
                <td>{sub.name}</td>
                <td>{sub.email}</td>
                <td>{sub.date}</td>
                <td>
                  <span
                    className={`badge ${sub.status === "Active" ? "bg-success" : "bg-secondary"}`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
                    <BiEdit />
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
