import { NextFunction, Request, Response } from "express";
import { ChatV2 } from "../Models/Chatv2";
import { User } from "../Models/User";
import mongoose from "mongoose";


export const createChat = async(req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.body;
    try {
        const createChat = await ChatV2.create({user_id})
        if(!createChat){
            return res.status(400).json({message: "no chat created"})
        }
        return res.status(201).json({chat: createChat})
    } catch (error) {
        next(error)
    }
}


export const getAllChats = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const getChats = await ChatV2.find().populate("chat_message").exec()
        return res.status(200).json({chats: getChats})
    } catch (error) {
        next(error)
    }
}


export const getChatById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const getChatById = await ChatV2.findById(req.params.id).populate("chat_message").exec()
        if(!getChatById){
            return res.status(404).json({message: "no chat found"})
        }
        return res.status(200).json({chat: getChatById})
    } catch (error) {
        next(error)
    }
}


export const deleteChat = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const getChatById = await ChatV2.findByIdAndDelete(req.params.id)
        if(!getChatById){
            return res.status(404).json({message: "could not delete, no chat found"})
        }
        return res.status(200).json({message: "successfully deleted chat"})
    } catch (error) {
        next(error)
    }
}


export const groupChatByCurrentUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // const { user_id } = req.query;
        const groupChat = await ChatV2.find({ user_id: req.query.user_id }).populate("chat_message").exec();

        if (groupChat.length === 0) {
            return res.status(404).json({ message: "No chats found for the user" });
        }

        return res.status(200).json({ chats: groupChat });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


