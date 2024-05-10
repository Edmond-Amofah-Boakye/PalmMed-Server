import { Request} from "express";
import { Message } from "../Models/Message";
import axios from "axios";

const sendMessageToLLM = async (chat_id: String, chat_instance : any) => {
  try {
    const response = await axios.post(
      `https://hearty-o4ui.onrender.com/api/v1/llm/history?chat_id=${chat_id}`
    , chat_instance);
    console.log(chat_instance)
    return response.data;
  } catch (error) {
    return { status: "failed", message: "an error occured", err: error };
  }
};

export const createMessage = async (req: Request) => {
  try {
    const { chat_id, chat_instance, from } = req.body;
    // send the message to the llm
    const userMessage = await Message.create({
      chat_id,
      message: chat_instance.user_prompt.prompt,
      from,
    });

    console.log(chat_instance)
    const llmResponse = await sendMessageToLLM(chat_id, chat_instance);
    if (!userMessage) {
      return {
        status: "failed",
        message: "failed to send prompt, try again",
      };
    }
    console.log(llmResponse)
    if (!llmResponse) {
      return {
        status: "failed",
        message: "failed to generate a response, try again",
      };
    }
    const aiMessage = await Message.create({
      chat_id,
      message: llmResponse,
      from: "AI",
    });
    return {
      status: "success",
      message: "successfully created a new message",
      userMessage,
      aiMessage,
    };
  } catch (error) {
    return { status: "error", message: "An error occured", err: error };
  }
};

export const getChatMessages = async (req: Request) => {
  try {
    const result = await Message.find({ chat_id: req.body.chat_id }).sort({
      createdAt: 1,
    });
    return {
      status: "success",
      messsage: "successfully retrieved chat messages",
      data: result,
    };
  } catch (error) {
    return { status: "error", message: "An error occured" };
  }
};
