import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { MessageV2 } from "../Models/Messagesv2";
import { ChatV2 } from "../Models/Chatv2";

const sendMessageToLLM = async (chat_id: String, requestData: any) => {
  try {
    const response = await axios.post(
      `https://hearty-o4ui.onrender.com/api/v1/llm/history?chat_id=${chat_id}`,
      requestData
    );
    return response.data;
  } catch (error) {
    return { status: "failed", message: "an error occured", err: error };
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { chat_id, message } = req.body;

    const findChatById = await ChatV2.findById(chat_id)

    if(!findChatById){
        return res.status(404).json({message: "no chat with Id found"})
    }

    const llmResponse = await sendMessageToLLM(chat_id, message);
    if (!llmResponse) {
      return {
        status: "failed",
        message: "failed to send prompt, try again",
      };
    }
    const addNewMessage = await MessageV2.create({
      chat_id,
      propmt: message.user_prompt.prompt,
      ai_response: llmResponse,
      message
    });

    if(!addNewMessage){
        return res.status(400).json({message: "failed to create new message"})
    }
    
    findChatById.chat_message.push(addNewMessage._id)
    await findChatById.save()

    return res.status(201).json({data: addNewMessage})
  } catch (error) {
    return { status: "error", message: "An error occured", err: error };
  }
};

// export const getChatMessages = async (req: Request) => {
//   try {
//     const result = await Message.find({ chat_id: req.body.chat_id }).sort({
//       createdAt: 1,
//     });
//     return {
//       status: "success",
//       messsage: "successfully retrieved chat messages",
//       data: result,
//     };
//   } catch (error) {
//     return { status: "error", message: "An error occured" };
//   }
// };
