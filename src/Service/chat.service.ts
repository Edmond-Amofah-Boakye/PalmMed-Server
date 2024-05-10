import { Request, Response } from "express";
import { Chat } from "../Models/Chat";

export const createNewChat = async (req: Request) => {
  try {
    const { email, user_id } = req.body;
    const result = await Chat.create({
      email,
      user_id,
    });
    if (!result) {
      return {
        status: "failed",
        message: "failed to create new chat, try again",
      };
    }
    return {
      status: "success",
      message: "successfully created a new chat",
      data: result,
    }
  } catch (error) {
    return { status: "error", message: "An error occured" };
  }
};

export const getUserChats = async (req: Request) => {
    try {
      const result = await Chat.find({user_id: req.body.user_id});
      if(!result){
        return {status: "failed", message: "failed to fetch user chats"};
      }
      return {
        status: "success",
        message: "successfully retrieved user chats",
        data: result
      }
    } catch(error) {
        return { status: "error", message: "An error occured, try again"}
    }
}

export const deleteChat = async (req: Request) => {
    try {
        const result = await Chat.findOneAndDelete({_id: req.body.chat_id});
        if(!result){
            return {status: "failed", message: "failed to delete chat"}
        }

        return {status: "success", message: "successfully deleted chat"}
    } catch(error) {
        return {status: "error", message: "an error occured, try again"}
    }
}
