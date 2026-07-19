import React, { useState } from "react";
import { BiSearch, BiReply, BiTrash, BiStar } from "react-icons/bi";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    {
      id: 1,
      name: "Michael Chen",
      email: "michael@example.com",
      subject: "Project Inquiry",
      date: "2024-01-15",
      priority: "High",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah@example.com",
      subject: "Technical Support",
      date: "2024-01-14",
      priority: "Medium",
    },
    {
      id: 3,
      name: "James Rodriguez",
      email: "james@example.com",
      subject: "Partnership Opportunity",
      date: "2024-01-13",
      priority: "Low",
    },
    {
      id: 4,
      name: "Lisa Thompson",
      email: "lisa@example.com",
      subject: "Feedback",
      date: "2024-01-12",
      priority: "Medium",
    },
    {
      id: 5,
      name: "Robert Patel",
      email: "robert@example.com",
      subject: "Bug Report",
      date: "2024-01-11",
      priority: "High",
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getPriorityBadge = (priority) => {
    const colors = {
      High: "bg-danger",
      Medium: "bg-warning",
      Low: "bg-info",
    };
    return <span className={`badge ${colors[priority]}`}>{priority}</span>;
  };

  return (
    <div className="data-page">
      <div className="page-header">
        <h2>Contacts</h2>
        <span className="text-muted">Total: {contacts.length}</span>
      </div>

      <div className="search-bar">
        <BiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search contacts..."
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
              <th>Subject</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => (
              <tr key={contact.id}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>{contact.date}</td>
                <td>{getPriorityBadge(contact.priority)}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
                    <BiReply />
                  </button>
                  <button className="btn btn-sm btn-outline-warning me-2">
                    <BiStar />
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

export default Contacts;
