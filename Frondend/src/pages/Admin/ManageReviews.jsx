import React, { useEffect, useState } from "react";
import { getAllReviewsApi } from "../../api/reviewApi";
import { Star } from "lucide-react";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadReviews = async () => {
        try {
            const { data } = await getAllReviewsApi();
            setReviews(data.reviews || []);
        } catch (error) {
            console.error("Error loading reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading Reviews...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-emerald-800">
                    ⭐ Review Management
                </h2>
            </div>

            {reviews.length === 0 ? (
                <div className="text-center text-gray-400 py-20 bg-white rounded-2xl shadow-sm border">
                    No reviews yet.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                                        {review.user?.name.charAt(0).toUpperCase() || "U"}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">
                                            {review.user?.name || "Unknown User"}
                                        </h4>
                                        <p className="text-xs text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={
                                                i < review.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                "{review.comment}"
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageReviews;
