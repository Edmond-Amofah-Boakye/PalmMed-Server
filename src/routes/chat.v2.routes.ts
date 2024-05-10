import express from "express";
import { createChat, deleteChat, getAllChats, getChatById, groupChatByCurrentUser } from "../controllers/chat.v2.controller";

const router = express.Router()


router.post('/create-chat', createChat)
router.get('/all-chats', getAllChats)
router.get('/:id', getChatById)
router.delete('/delete/:id', deleteChat)
router.get('/get/user/chats', groupChatByCurrentUser)


export default router;