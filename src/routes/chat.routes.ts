import express from "express";
import {
  clearChat,
  getChatHistory,
  initiateChat,
} from "../controllers/chat.controller";
import auth from "../middlewares/auth";

const router = express.Router();

/**
 * @swagger
 * /api/v1/chats/initiate-chat:
 *   post:
 *     summary: Create a new chat.
 *     description: Endpoint to create a new chat.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created a new chat.
 *       '400':
 *         description: Failed to create new chat, try again.
 *       '500':
 *         description: An error occurred.
 */
router.post("/initiate-chat", initiateChat);

/**
 * @swagger
 * /api/v1/chats/get-chat-history:
 *   post:
 *     summary: Get Chat History.
 *     description: Endpoint to get chat history.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched chat history.
 *       '500':
 *         description: An error occurred.
 */


router.post("/get-chat-history",  getChatHistory);
/**
 * @swagger
 * /api/v1/chats/clear-chat:
 *   delete:
 *     summary: Delete A Chat.
 *     description: Endpoint to delete.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chat_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted chat.
 *       '500':
 *         description: An error occurred.
 */
router.delete("/clear-chat",  clearChat);

export default router;
