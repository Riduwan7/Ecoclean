import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();
import pkg from "jsonwebtoken"
const {verify}=pkg


export const Auth = async (req,res,next) => {
    try{
        const data = req.headers.authorization;
        if(!data){
            return res.status(401).send("Token not found")
        }

        const token = data.split(" ")[1];
        const val = verify(token, process.env.JWT_TOKEN);

        if(val) {
            req.user = val;
            next();
        }
    }catch(error){
        return res.status(401).send("Unauthorized Access")
    }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    if (req.user.role !== "admin") {
      return res.status(403).send("Access denied. Admin only.");
    }
    next();
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

export const staffOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "staff") {
      return res
        .status(403)
        .json({ message: "Access denied: Staff only" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
  

