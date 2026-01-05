import ReviewSchema from "../Models/ReviewSchema.js";
import UserSchema from "../Models/UserSchema.js";

export const createReview = async (req,res) => {
    try{
        const { rating,comment } = req.body;

        if(!rating || !comment) {
            return res.status(400).json({message:"All fields are required.."})
        }

        const review = await ReviewSchema.create({ user:req.user.id,rating,comment });
        res.status(201).json({ success:true, meesage:"Review added successfully",review});
    }catch(error){
        res.status(500).json({ message:error.message })
    }
};

export const getAllReviews = async (req,res) => {
    try{
        const reviews = await ReviewSchema.find().populate("user","name email role phone").sort({ createdAt: -1 });
        res.status(200).json({ success:true, reviews })
    }catch(error){
        res.status(500).json({ message:error.message })
    }
}

export const getMyReview = async (req,res) => {
    try{
        const MyReview = await ReviewSchema.findOne({ user:req.user.id });

        if(!MyReview){
            return res.status(404).json({ message: "You have not added a review yet" });
        }
        res.status(200).json({ success:true, MyReview })
    }catch(error){
        res.status(500).json({ message:error.message })
    }
}

export const getAverageRating = async (req, res) => {
  try {
    const reviews = await ReviewSchema.find();

    const average =
      reviews.reduce((acc, r) => acc + r.rating, 0) /
      (reviews.length || 1);

    res.status(200).json({
      success: true,
      averageRating: average.toFixed(1),
      totalReviews: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};