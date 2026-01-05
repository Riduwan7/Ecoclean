// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

// import UserSchema from "./Models/UserSchema.js";


// import bcrypt from "bcrypt"


// export const register = async (req,res) => {
//     const {name,email,phone,password,role,address} = req.body;
//     try{
//         const existingUser = await UserSchema.findOne({email});
//         if(existingUser){
//             return res.status(400).json({message:"User already exists..."});
//         }
//         const hpass = await bcrypt.hash(password,10)

//         const newUser = new UserSchema({ name,email,phone,password:hpass,role,address });
//         const savedUser = await newUser.save();

//         res.status(201).json({
//             message:"User registered successfully...",
//             user:{
//                 _id: savedUser._id,
//                 name: savedUser.name,
//                 email: savedUser.email,
//                 phone: savedUser.phone,
//                 role: savedUser.role,
//                 address: savedUser.address,
//             }
//         });
//     }catch(error){
//         console.log("Error while registering:",error);
//         res.status(500).json({message:"Error while registering",error:error.message});
//     }
// };

// export const login = async (req,res) => {
//     const { email,password } = req.body;
//     try{
//         const user = await UserSchema.findOne({email});
//         if(!user){
//             return res.status(400).json({message:"Invalid email or password"});
//         }
//         const isMatch = await bcrypt.compare(password, user.password)
//         if(!isMatch){
//             return res.status(400).json({message:"Invalid email or password"});
//         }

//         const token = jwt.sign(
//             { id:user._id, role:user.role },
//             process.env.JWT_TOKEN,{expiresIn:"7d"}
//         );
        
//         res.status(200).json({
//             message:"Login successfully...",
//             token,
//             user:{
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 role: user.role,
//                 address: user.address,
//             }
//         });
//     }catch(error){
//         console.log("Error while login:",error);
//         res.status(500).json({message:"Error while login",error:error.message});
//     }
// };

// export const getprofile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     if (!userId) {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     const user = await UserSchema.findById(userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error while fetching profile:", error);
//     res.status(500).json({
//       message: "Error fetching user profile",
//       error: error.message
//     });
//   }
// };








