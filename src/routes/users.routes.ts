import express from "express";
import { findAll, findById, findMe, updateUserProfile } from "../controllers/users.controllers";
import {
  createUser,
  login,
  forgotPassword,
  verifyToken,
  resetPassword,
} from "../controllers/users.controllers";
import auth from "../middlewares/auth";
import restrictAcsessTo from "../middlewares/restrictAccessTo";

const router = express.Router();


/**
 * @swagger
 * /api/v1/users/findby/{id}:
 *   get:
 *     summary: Find  A User
 *     description: Find User by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Find User by id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: success
 *       '500':
 *         description: Internal server error
 */
router.get("/findby/:id", auth, restrictAcsessTo("doctor"), findById);



/**
 * @swagger
 * /api/v1/users/find/all:
 *   get:
 *     summary: Find All Users
 *     description: Find all Users
 *     responses:
 *       '200':
 *         description: success
 *       '500':
 *         description: Internal server error
 */
router.get("/find/all", auth, restrictAcsessTo("doctor"), findAll);





/**
 * @swagger
 * /api/v1/users/find/me:
 *   get:
 *     summary: Find Loggedin User
 *     description: Find Loggedin User
 *     responses:
 *       '200':
 *         description: success
 *       '500':
 *         description: Internal server error
 */
router.get("/find/me", auth, findMe);

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with the provided details
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
 *         description: User registered successfully
 *       '400':
 *         description: Bad request, invalid data provided
 *       '409':
 *         description: Conflict, email already exists
 *       '500':
 *         description: Internal server error
 */
router.post("/register", createUser);

/**
 * @swagger
 * /api/v1/users/profile:
 *   patch:
 *     summary: Update user profile
 *     description: Updates the profile information of the authenticated user
 *     security:
 *       - bearerAuth: []
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
 *               imageUrl:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *       '401':
 *         description: Unauthorized, user not authenticated
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/profile", auth, updateUserProfile);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with provided email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request, invalid data provided
 *       '404':
 *         description: User not found or invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/users/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Sends a password reset link to the provided email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: Password reset link sent successfully
 *       '400':
 *         description: Bad request, invalid data provided
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/v1/users/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     description: Resets user's password using the provided reset token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Reset token received via email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '400':
 *         description: Bad request, invalid data provided
 *       '404':
 *         description: No user with token found
 *       '500':
 *         description: Internal server error
 */
router.post("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /api/v1/users/verify/{token}:
 *   get:
 *     summary: Verify token
 *     description: Verifies the validity of a reset token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Reset token received via email
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Proceed to reset password
 *       '404':
 *         description: Token does not exist or has expired
 *       '500':
 *         description: Internal server error
 */
router.get("/verify/:token", verifyToken);

export default router;
