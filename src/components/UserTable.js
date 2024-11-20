// src/components/UserTable.js
import React from "react";
import { deleteUser } from "../services/api";

const UserTable = ({ users, setUsers, setError, setForm }) => {
  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.department || "Data"}</td>
            <td>
              <button className="button1" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button className="button2" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
