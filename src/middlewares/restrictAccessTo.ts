import { NextFunction, Request, Response } from "express"

interface IRequestTYpe extends Request {
    user: any
}

const restrictAcsessTo = (...roles: any) => {
    return (req: any, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user.role)){
            return next(res.status(401).json({message: "not authorized to access this route"}))
        }
        next()
    }
}

export default restrictAcsessTo;