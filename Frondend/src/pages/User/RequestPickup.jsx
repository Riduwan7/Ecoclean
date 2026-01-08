import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPickupApi } from "../../api/pickupApi";

const wasteCategories = [
  "plastic",
  "non-plastic",
  "ewaste",
  "metal",
  "glass",
  "organic",
  "paper",
  "mixed",
];

const RequestPickup = () => {
  const navigate = useNavigate();

  const [pickupType, setPickupType] = useState("household");
  const [address, setAddress] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [notes, setNotes] = useState("");
  const [wasteItems, setWasteItems] = useState([
    { category: "plastic", quantity: 1 },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addWasteItem = () => {
    setWasteItems([...wasteItems, { category: "plastic", quantity: 1 }]);
  };

  const removeWasteItem = (index) => {
    setWasteItems(wasteItems.filter((_, i) => i !== index));
  };

  const handleWasteChange = (index, field, value) => {
    const updated = [...wasteItems];
    updated[index][field] = value;
    setWasteItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createPickupApi({
        pickupType,
        wasteItems,
        address,
        scheduledDate,
        notes,
      });

      navigate("/user/my-pickups");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create pickup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">

        <h2 className="text-2xl font-bold text-emerald-700 mb-6">
          ♻️ Request Waste Pickup
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-1">
              Pickup Type
            </label>
            <select
              value={pickupType}
              onChange={(e) => setPickupType(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="household">Household</option>
              <option value="commercial">Commercial</option>
              <option value="bulk">Bulk</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Waste Items
            </label>

            {wasteItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 items-center mb-2"
              >
                <select
                  value={item.category}
                  onChange={(e) =>
                    handleWasteChange(index, "category", e.target.value)
                  }
                  className="border rounded-lg px-3 py-2 w-1/2"
                >
                  {wasteCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleWasteChange(index, "quantity", e.target.value)
                  }
                  className="border rounded-lg px-3 py-2 w-1/4"
                />

                {wasteItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWasteItem(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addWasteItem}
              className="text-emerald-600 text-sm mt-2"
            >
              + Add more
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Pickup Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Scheduled Date
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              rows="2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition"
          >
            {loading ? "Submitting..." : "Submit Pickup Request"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RequestPickup;
