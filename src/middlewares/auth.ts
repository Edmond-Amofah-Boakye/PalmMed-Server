import { NextFunction, Request, Response } from "express";
import { User as UserSchema } from "../Models/User";
import { Doctor as DoctorSchema } from "../Models/Doctor";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ReqTyp extends Request {
  user: any;
}

const auth = async (req: any, res: Response, next: NextFunction) => {
    let token: any;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1]
    }

    try {
        const decode = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`) as JwtPayload
        if(!decode) return res.status(401).json({message: "unauthorized access"})

        let user;
        

        user = await UserSchema.findById(decode.id) 

        if(!user){
            user = await DoctorSchema.findById(decode.id)
            if(!user) return res.status(404).json({message: "no user found"})
        }

        req.user = user;
        next()
        
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default auth;
