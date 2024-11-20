// src/App.js
import React, { useState, useEffect } from "react";
import { fetchUsers } from "./services/api";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="App">
      <h1>User Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <UserForm
        form={form}
        setForm={setForm}
        setUsers={setUsers}
        users={users}
        setError={setError}
      />

      <UserTable
        users={users}
        setUsers={setUsers}
        setError={setError}
        setForm={setForm}
      />
    </div>
  );
};

export default App;
