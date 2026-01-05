import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAssignedPickupsApi,
  updatePickupStatusApi,
  uploadProofApi
} from "../../api/staffApi";

const statusOptions = [
  { value: "assigned", label: "Assigned", color: "text-yellow-600 bg-yellow-50" },
  { value: "on-the-way", label: "Ongoing / On the Way", color: "text-blue-600 bg-blue-50" },
  { value: "collected", label: "Collected", color: "text-purple-600 bg-purple-50" },
  { value: "completed", label: "Completed", color: "text-green-600 bg-green-50" }
];

const StaffPickups = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pickups, setPickups] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAssignedPickupsApi();
      setPickups(data || []);
    } catch (err) {
      console.error("Error fetching pickups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (e, id) => {
    const newStatus = e.target.value;
    try {
      await updatePickupStatusApi(id, newStatus);
      setPickups(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleFileChange = async (id, file) => {
    if (!file) return;
    try {
      await uploadProofApi(id, file);
      alert("Proof uploaded successfully!");
    } catch (err) {
      alert("Error uploading proof");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50 text-emerald-600 font-bold">
      Loading tasks...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <h1 className="text-xl font-bold text-emerald-700 tracking-tight">
              EcoClean <span className="text-gray-400 font-medium">Staff</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/staff/dashboard")}
              className="text-gray-500 hover:text-emerald-600 font-bold text-sm hidden sm:block"
            >
              Dashboard
            </button>
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-right">
               <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Logged in as</p>
               <p className="text-sm font-bold text-gray-700">{user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-red-100 transition"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-8">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Pickups List</h2>
            <p className="text-gray-500 mt-2 font-medium">Click on a card below to update status or upload proof.</p>
          </div>
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200">
            <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">Total Assigned</p>
            <p className="text-2xl font-black leading-none mt-1">{pickups.length}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {pickups.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <p className="text-gray-400 font-bold">No pickups currently assigned to you.</p>
          </div>
        ) : (
          pickups.map((p) => {
            const isExpanded = expandedId === p._id;
            const currentStatus = statusOptions.find(s => s.value === p.status);

            return (
              <div 
                key={p._id} 
                className={`bg-white rounded-4xl border-2 transition-all duration-300 overflow-hidden ${
                  isExpanded ? "border-emerald-500 shadow-xl" : "border-transparent shadow-sm hover:border-gray-200"
                }`}
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => setExpandedId(isExpanded ? null : p._id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl ${isExpanded ? 'bg-emerald-100' : 'bg-gray-50'}`}>
                       {p.pickupType === 'household' ? '🏠' : '🏢'}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-800 text-lg leading-tight">{p.userId?.name}</h3>
                      <p className="text-gray-400 text-sm font-bold">📍 {p.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${currentStatus?.color}`}>
                      {p.status}
                    </span>
                    <span className={`text-xl transition-transform ${isExpanded ? 'rotate-180 text-emerald-500' : 'text-gray-300'}`}>
                      ▾
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-8 pt-2 bg-emerald-50/20 border-t border-dashed border-emerald-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Update Stage</label>
                          <select 
                            value={p.status}
                            onChange={(e) => handleStatusUpdate(e, p._id)}
                            className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-emerald-500 outline-none font-bold text-gray-700 shadow-sm"
                          >
                            {statusOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Upload Proof Photo</label>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileChange(p._id, e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-black file:bg-emerald-600 file:text-white cursor-pointer shadow-sm hover:file:bg-emerald-700 transition"
                          />
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-inner">
                         <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-4 tracking-widest">Pickup Info</h4>
                         <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                               <span className="text-gray-400 font-bold">Waste Type</span>
                               <span className="text-gray-800 font-black capitalize">{p.pickupType}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-gray-400 font-bold">Contact</span>
                               <span className="text-gray-800 font-black">{p.userId?.phone || "N/A"}</span>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                               <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Staff/User Notes:</p>
                               <p className="text-sm text-gray-600 italic">"{p.notes || 'No notes available'}"</p>
                            </div>
                         </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StaffPickups;
