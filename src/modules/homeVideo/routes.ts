import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { createHomeVideoSchema, updateHomeVideoSchema } from "./schema";
import { requireAuth } from "@/middlewares/requireAuth";
import {
  createHomeVideoController,
  getHomeVideoController,
  updateHomeVideoController,
  deleteHomeVideoController,
} from "./controllers";

const router = Router();
// public routes
router.get("/", getHomeVideoController);

// private routes
router.post(
  "/",
  requireAuth,
  validate({ body: createHomeVideoSchema }),
  createHomeVideoController
);

router.put(
  "/:id",
  requireAuth,
  validate({ body: updateHomeVideoSchema }),
  updateHomeVideoController
);

router.delete("/:id", requireAuth, deleteHomeVideoController);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     HomeVideo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the home video
 *         title:
 *           type: string
 *           description: The title of the home video
 *         carModel:
 *           type: string
 *           description: The car model featured in the video
 *         monthlyPrice:
 *           type: string
 *           description: The monthly price for the car
 *         carType:
 *           type: string
 *           enum: [premium, economy, luxury]
 *           description: The type of car
 *         videoUrl:
 *           type: string
 *           description: The URL of the video
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the video was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the video was last updated
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         title: "BMW X5 Showcase"
 *         carModel: "BMW X5"
 *         monthlyPrice: "$599"
 *         carType: "luxury"
 *         videoUrl: "https://example.com/video.mp4"
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 *     CreateHomeVideo:
 *       type: object
 *       required:
 *         - title
 *         - carModel
 *         - monthlyPrice
 *         - carType
 *         - videoUrl
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the home video
 *         carModel:
 *           type: string
 *           description: The car model featured in the video
 *         monthlyPrice:
 *           type: string
 *           description: The monthly price for the car
 *         carType:
 *           type: string
 *           enum: [premium, economy, luxury]
 *           description: The type of car
 *         videoUrl:
 *           type: string
 *           description: The URL of the video
 *       example:
 *         title: "BMW X5 Showcase"
 *         carModel: "BMW X5"
 *         monthlyPrice: "$599"
 *         carType: "luxury"
 *         videoUrl: "https://example.com/video.mp4"
 *     UpdateHomeVideo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the home video
 *         carModel:
 *           type: string
 *           description: The car model featured in the video
 *         monthlyPrice:
 *           type: string
 *           description: The monthly price for the car
 *         carType:
 *           type: string
 *           enum: [premium, economy, luxury]
 *           description: The type of car
 *         videoUrl:
 *           type: string
 *           description: The URL of the video
 *       example:
 *         title: "Updated BMW X5 Showcase"
 *         monthlyPrice: "$649"
 */

/**
 * @swagger
 * tags:
 *   name: Home Videos
 *   description: Home video management
 */

/**
 * @swagger
 * /api/home-videos:
 *   get:
 *     summary: Get the latest home video
 *     tags: [Home Videos]
 *     responses:
 *       200:
 *         description: Home video fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Home video fetched successfully"
 *                 data:
 *                   $ref: '#/components/schemas/HomeVideo'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new home video
 *     tags: [Home Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHomeVideo'
 *     responses:
 *       201:
 *         description: Home video created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Home video created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/HomeVideo'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/home-videos/{id}:
 *   put:
 *     summary: Update a home video
 *     tags: [Home Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The home video id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHomeVideo'
 *     responses:
 *       200:
 *         description: Home video updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Home video updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/HomeVideo'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Home video not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a home video
 *     tags: [Home Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The home video id
 *     responses:
 *       200:
 *         description: Home video deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Home video deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Home video not found
 *       500:
 *         description: Internal server error
 */
