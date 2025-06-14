import { Request, Response, NextFunction } from "express";
import { createTips, getTips, updateTips, deleteTips } from "./services";
import { CreateTipsType, UpdateTipsType } from "./schema";

export const createTipsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTips = await createTips(req.body);
    res.status(201).json({
      message: "Tips created successfully",
      data: newTips,
    });
  } catch (error) {
    next(error);
  }
};

export const getTipsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tips = await getTips();
    res.status(200).json({
      message: "Tips fetched successfully",
      data: tips,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTipsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTips = await updateTips(req.params.id, req.body);
    res.status(200).json({
      message: "Tips updated successfully",
      data: updatedTips,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTipsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteTips(req.params.id);
    res.status(200).json({
      message: "Tips deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
