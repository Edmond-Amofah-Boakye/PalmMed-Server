import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();


/**
 * @swagger
 * /api/v1/health/ping:
 *   get:
 *     summary: Health Check
 *     description: API Health Check
 *     responses:
 *       '200':
 *         description: Testing successful
 *       '500':
 *         description: Internal server error
 */
router.get('/ping', (req: Request, res: Response, next: NextFunction) => {
  res.send('API--V1-- Testing sucessful');
});

export default router;
