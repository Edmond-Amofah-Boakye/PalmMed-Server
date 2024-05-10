import { NextFunction, Request, Response } from "express";
import { createNewChat, deleteChat, getUserChats } from "../Service/chat.service";

export const initiateChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await createNewChat(req);
        if(results.status !== "success"){
            return res.status(400).json(results)
        }
        return res.status(201).json(results)
    } catch(error) {
        return next(error);
    }
  };

export const getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await getUserChats(req);
        if(results.status !== "success"){
            return res.status(400).json(results);
        }
        return res.status(200).json(results)
    } catch(error) {
        return next(error);
    }
}

export const clearChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await deleteChat(req);
        if(results.status !== "success") {
            return res.status(400).json(results)
        }
        return res.status(200).json(results)
    } catch(error){
        return next(error)
    }
}