import React, { useEffect, useState } from "react";
import { getAllUsersApi, toggleUserStatusApi, deleteUserApi } from "../../api/adminApi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const { data } = await getAllUsersApi();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleToggle = async (id) => {
    await toggleUserStatusApi(id);
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user permanently?")) {
      await deleteUserApi(id);
      loadUsers();
    }
  };

  if (loading) return <div className="p-10 text-center">Loading User Data...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-emerald-800">Community Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-widest border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-700">{u.name}</td>
                <td className="p-4 text-gray-500">{u.email}</td>
                <td className="p-4 capitalize"><span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-bold">{u.role}</span></td>
                <td className="p-4">
                  <span className={`font-bold ${u.isActive ? "text-emerald-600" : "text-red-500"}`}>
                    {u.isActive ? "● Active" : "● Blocked"}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleToggle(u._id)} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-100">Toggle</button>
                  <button onClick={() => handleDelete(u._id)} className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-100">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;