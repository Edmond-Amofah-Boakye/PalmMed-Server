import express from "express";
import { createMessage } from "../controllers/messages.v2.controller";
const router = express.Router()


router.post('/create-message', createMessage)



export default router;