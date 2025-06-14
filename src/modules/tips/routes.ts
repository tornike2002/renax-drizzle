import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { requireAuth } from "@/middlewares/requireAuth";
import { createTipsSchema, updateTipsSchema } from "./schema";
import {
  createTipsController,
  getTipsController,
  updateTipsController,
  deleteTipsController,
} from "./controllers";

const router = Router();

// public routes
router.get("/", getTipsController);

// private routes
router.post(
  "/",
  requireAuth,
  validate({ body: createTipsSchema }),
  createTipsController
);

router.put(
  "/:id",
  requireAuth,
  validate({ body: updateTipsSchema }),
  updateTipsController
);

router.delete("/:id", requireAuth, deleteTipsController);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Tip:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The tip ID
 *         title:
 *           type: string
 *           description: The tip title
 *         tip:
 *           type: string
 *           description: The tip content
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         id: "507f1f77bcf86cd799439011"
 *         title: "JavaScript Best Practice"
 *         tip: "Always use const for variables that won't be reassigned"
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 *     CreateTip:
 *       type: object
 *       required:
 *         - title
 *         - tip
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: The tip title
 *         tip:
 *           type: string
 *           minLength: 1
 *           description: The tip content
 *       example:
 *         title: "JavaScript Best Practice"
 *         tip: "Always use const for variables that won't be reassigned"
 *     UpdateTip:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: The tip title
 *         tip:
 *           type: string
 *           minLength: 1
 *           description: The tip content
 *       example:
 *         title: "Updated JavaScript Best Practice"
 *         tip: "Always use const for variables that won't be reassigned, and let for variables that will be"
 */

/**
 * @swagger
 * /tips:
 *   get:
 *     summary: Get all tips
 *     tags: [Tips]
 *     responses:
 *       200:
 *         description: List of tips retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tip'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new tip
 *     tags: [Tips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTip'
 *     responses:
 *       201:
 *         description: Tip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tip'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tips/{id}:
 *   put:
 *     summary: Update a tip
 *     tags: [Tips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tip ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTip'
 *     responses:
 *       200:
 *         description: Tip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tip'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tip not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a tip
 *     tags: [Tips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tip ID
 *     responses:
 *       200:
 *         description: Tip deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tip not found
 *       500:
 *         description: Internal server error
 */

