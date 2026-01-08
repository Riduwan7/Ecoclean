import React, { useState, useEffect } from "react";
import { createReviewApi, getMyReviewApi } from "../../api/reviewApi";

const AddReview = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    const checkExisting = async () => {
      try {
        const res = await getMyReviewApi();
        if (res.data.success) setExistingReview(res.data.MyReview);
      } catch (err) {
        console.log("No existing review found.");
      }
    };
    checkExisting();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await createReviewApi({ rating, comment });
      setExistingReview(response.data.review);
      setSuccess("Thank you for your feedback! ⭐");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (existingReview) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-full max-w-xl bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-emerald-800 mb-2">Your Review is Live!</h2>
          <p className="text-gray-600 mb-4">" {existingReview.comment} "</p>
          <div className="flex justify-center text-yellow-500 text-lg">
            {Array.from({ length: existingReview.rating }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-emerald-700 mb-2">⭐ Add Review</h2>
        <p className="text-sm text-gray-500 mb-6">Share your experience with EcoClean</p>

        {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</p>}
        {success && <p className="bg-green-100 text-green-600 p-3 rounded-lg text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
            <textarea
              rows="4"
              placeholder="Write your feedback here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;