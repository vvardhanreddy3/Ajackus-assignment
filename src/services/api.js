// src/services/api.js
const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch users.");
    return await response.json();
  } catch (err) {
    throw new Error("Failed to fetch users. Please try again later.");
  }
};

export const saveUser = async (user, id = null) => {
  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Failed to save user.");
    return await response.json();
  } catch (err) {
    throw new Error("Failed to save user. Please try again.");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete user.");
    return true;
  } catch (err) {
    throw new Error("Failed to delete user. Please try again.");
  }
};
