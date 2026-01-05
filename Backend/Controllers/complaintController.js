import ComplaintSchema from "../Models/ComplaintSchema.js";

export const createComplaint = async (req,res) => {
    try{
        const { pickupId,subject,description } = req.body;
        const newComplaint = new ComplaintSchema({
            userId: req.user.id,
            pickupId,
            subject,
            description,
        });

        const savedComplaint = await newComplaint.save();
        res.status(201).json({message:"Complaint submitted successfully", complaint:savedComplaint});
    }catch(error){
        console.error("Error creating complaint:",error);
        res.status(500).json({ message:"Server error", error:error.message })
    }
};

export const getUserComplaint = async (req,res) => {
    try{
        const complaints = await ComplaintSchema.find({ userId:req.user.id }).sort({ createdAt:-1 });
        res.status(200).json(complaints)
    }catch(error){
        console.error("Error creating complaint:",error);
        res.status(500).json({ message:"Server error", error:error.message })
    }
}

export const getAllComplaint = async (req,res) => {
    try{
        const complaints = await ComplaintSchema.find().populate("userId","name email phone").sort({ createdAt:-1 });
        res.status(200).json(complaints)
    }catch(error){
        console.error("Error creating complaint:",error);
        res.status(500).json({ message:"Server error", error:error.message })
    }
}


export const updateComplaint = async (req,res) => {
    try{
        const { id } =  req.params;
        const { status,adminNotes } = req.body;

        const complaint = await ComplaintSchema.findById(id);
        if(!complaint)
            return res.status(404).json({ message:"Complaint not found" })

        if(status) complaint.status = status
        if(adminNotes) complaint.adminNotes = adminNotes

        await complaint.save();
        res.status(200).json({ message:"Complaint updated",complaint });
    }catch(error){
        console.error("Error updating complaint:",error);
        res.status(500).json({ message:"Server error", error:error.message })
    }
}



