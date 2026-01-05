import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadComplaints = async () => {
    const res = await axiosInstance.get("/complaints");
    setComplaints(res.data);
    setFiltered(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  useEffect(() => {
    let data = complaints;

    if (filter !== "all") data = data.filter(c => c.status === filter);

    if (search.trim() !== "")
      data = data.filter(c =>
        c.subject.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.userId?.name.toLowerCase().includes(search.toLowerCase())
      );

    setFiltered(data);
  }, [search, filter, complaints]);

  const badge = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700"
  };

  const updateStatus = async (id, status) => {
    await axiosInstance.patch(`/complaints/${id}`, { status });
    loadComplaints();
  };

  const addNote = async (id) => {
    const notes = prompt("Enter admin response note:");
    if (!notes) return;

    await axiosInstance.patch(`/complaints/${id}`, { adminNotes: notes });
    loadComplaints();
  };

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-800">
          🛠 Complaint Management
        </h2>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap gap-4 items-center">

        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-64"
        />

        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <p className="text-sm text-gray-500 ml-auto">
          Showing <b>{filtered.length}</b> complaints
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-20 bg-white rounded-2xl shadow-sm border">
          No complaints found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filtered.map(c => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${badge[c.status]}`}
                >
                  {c.status}
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-gray-800 font-bold text-lg mb-1">
                {c.subject}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {c.description}
              </p>

              <p className="text-xs text-gray-500 mb-2">
                👤 {c.userId?.name || "User removed"}
              </p>

              {c.adminNotes && (
                <p className="text-xs bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-emerald-700 mb-3">
                  📝 Admin Note: {c.adminNotes}
                </p>
              )}

              <div className="flex gap-2">
                <select
                  value={c.status}
                  onChange={e => updateStatus(c._id, e.target.value)}
                  className="border rounded-lg px-2 py-1 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <button
                  onClick={() => addNote(c._id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Add Note
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;
