import express from "express";
const router = express.Router()
import auth from "../middlewares/auth";
import { createDoctor, createReport } from "../controllers/doctor.controller";
import restrictAcsessTo from "../middlewares/restrictAccessTo";


/**
 * @swagger
 * /api/v1/doctors/create:
 *   post:
 *     summary: Register a new Doctor
 *     description: Creates a new Doctor with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor registered successfully
 *       '400':
 *         description: Bad request, invalid data provided
 *       '409':
 *         description: Conflict, email already exists
 *       '500':
 *         description: Internal server error
 */
router.post('/create', createDoctor)

/**
 * @swagger
 * /api/v1/doctors/report/{id}:
 *   get:
 *     summary: Generate Report for patient
 *     description: Create Report for Patient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Create Report for Patient
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Report successfully created
 *       '404':
 *         description: No user found
 *       '500':
 *         description: Internal server error
 */
router.post('/report/:id', auth, restrictAcsessTo("doctor"), createReport)

export default router;