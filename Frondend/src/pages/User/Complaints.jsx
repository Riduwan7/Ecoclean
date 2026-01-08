import React, { useEffect, useState } from "react";
import { createComplaintApi, getMyComplaintsApi } from "../../api/compliantApi.js";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-700", 
  resolved: "bg-green-100 text-green-700",
};

const Complaints = () => {
  const [subject, setSubject] = useState(""); 
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchComplaints = async () => {
    try {
      const { data } = await getMyComplaintsApi();
      setComplaints(data);
    } catch (err) {
      setError("Failed to load complaints history.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await createComplaintApi({ subject, description });
      setSubject("");
      setDescription("");
      setSuccess("Complaint submitted successfully.");
      fetchComplaints();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6">📝 My Complaints</h2>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Raise a Complaint</h3>

          {error && <p className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">{error}</p>}
          {success && <p className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Subject (e.g., Delayed Pickup)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />

            <textarea
              placeholder="Describe your issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Subject</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                  <th className="px-6 py-4 text-center font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-400 italic">
                      No complaints submitted yet.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr key={c._id} className="hover:bg-emerald-50/30 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{c.subject}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{c.description}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyles[c.status] || "bg-gray-100"}`}>
                          {c.status}
                        </span>
                        {c.adminNotes && (
                          <p className="text-[10px] text-gray-400 mt-1 italic">Note: {c.adminNotes}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;