// src/components/UserForm.js
import React from "react";
import { saveUser } from "../services/api";

const UserForm = ({ form, setForm, setUsers, users, setError }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.department) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const submitUserForm = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedUser = await saveUser(form, form.id);
      if (form.id) {
        setUsers(
          users.map((user) => (user.id === form.id ? updatedUser : user))
        );
      } else {
        setUsers([...users, updatedUser]);
      }

      setForm({ id: null, name: "", email: "", department: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submitUserForm}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleInputChange}
        required
      />
      <button type="submit">{form.id ? "Update" : "Add"}</button>
    </form>
  );
};

export default UserForm;
