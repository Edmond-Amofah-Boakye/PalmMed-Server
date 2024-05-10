import express from "express";
import {
  initiateMessage,
  retrieveChatMessages,
} from "../controllers/message.controller";
import auth from "../middlewares/auth";

const router = express.Router();


/**
 * @swagger
 * /api/v1/messages/initiate-message:
 *   post:
 *     summary: Start Chat Message.
 *     description: Endpoint to start chat messages.
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
 *               message:
 *                 type: string
 *               from:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully started a chat message.
 *       '500':
 *         description: An error occurred.
 */
router.post("/initiate-message", initiateMessage);


/**
 * @swagger
 * /api/v1/messages/retrieve-chat-messages:
 *   post:
 *     summary: Get Chat Messages.
 *     description: Endpoint to get chat messages.
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
 *         description: Successfully fetched chat message.
 *       '500':
 *         description: An error occurred.
 */

router.post("/retrieve-chat-messages", retrieveChatMessages);

export default router;
