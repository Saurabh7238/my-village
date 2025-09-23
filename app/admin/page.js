"use client";

import { useEffect, useState } from "react";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  const addNotification = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const newItem = await res.json();
    setNotifications((prev) => [...prev, newItem]);
    setTitle("");
    setDescription("");
  };

  const deleteNotification = async (id) => {
    await fetch("/api/notifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Notifications</h1>

        {/* Add form */}
        <form onSubmit={addNotification} className="mb-8 space-y-4">
          <input
            className="border p-2 w-full rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Notification
          </button>
        </form>

        {/* List */}
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{n.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {n.description}
                </p>
              </div>
              <button
                onClick={() => deleteNotification(n.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
