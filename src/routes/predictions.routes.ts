import express from "express";
const router = express.Router()
import auth from "../middlewares/auth";
import { findAll, predict } from "../controllers/prediction.controller";
import restrictAcsessTo from "../middlewares/restrictAccessTo";


/**
 * @swagger
 * /api/v1/predictions/predict/{id}:
 *   post:
 *     summary: Prediction
 *     description: makes prediction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: make prediction for user by id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Prediction successful
 *       '500':
 *         description: Internal server error
 */
router.post("/predict/:id", auth, restrictAcsessTo("doctor"), predict)
router.get("/", auth, restrictAcsessTo("doctor"), findAll)

export default router;