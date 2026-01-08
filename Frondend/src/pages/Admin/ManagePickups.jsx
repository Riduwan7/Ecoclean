import React, { useEffect, useState } from "react";
import { getAllPickupsAdminApi, getAllUsersApi, assignPickupApi } from "../../api/adminApi";

const ManagePickups = () => {
  const [pickups, setPickups] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [pickupRes, userRes] = await Promise.all([
        getAllPickupsAdminApi(),
        getAllUsersApi()
      ]);
      setPickups(pickupRes.data);
      setStaff(userRes.data.filter(u => u.role === "staff"));
    } catch (err) {
      console.error("Failed to load pickups", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAssign = async (pickupId, staffId) => {
    try {
      await assignPickupApi(pickupId, staffId);
      alert("Assigned successfully!");
      loadData(); 
    } catch (err) {
      alert("Error assigning staff");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Pickup Requests...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-emerald-800">Manage Pickups</h2>
      
      <div className="space-y-4">
        {pickups.length > 0 ? pickups.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow-sm border p-5 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex gap-2 items-center mb-1">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {p.status}
                </span>
                <p className="font-bold text-gray-800">{p.userId?.name || "Anonymous User"}</p>
              </div>
              <p className="text-sm text-gray-600">{p.address}</p>
              <p className="text-xs text-gray-400">Type: {p.pickupType || 'General Waste'}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="border rounded-lg p-2 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => handleAssign(p._id, e.target.value)}
                defaultValue={p.assignedTo || ""}
              >
                <option value="" disabled>Assign Collector</option>
                {staff.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed text-gray-400">
            No pickup requests found in the system.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePickups;