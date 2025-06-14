import { Request, Response, NextFunction } from "express";
import {
  createHomeVideo,
  getHomeVideo,
  updateHomeVideo,
  deleteHomeVideo,
} from "./services";

export const createHomeVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newHomeVideo = await createHomeVideo(req.body);
    res.status(201).json({
      message: "Home video created successfully",
      data: newHomeVideo,
    });
  } catch (error) {
    next(error);
  }
};

export const getHomeVideoController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const homeVideo = await getHomeVideo();
    res.status(200).json({
      message: "Home video fetched successfully",
      data: homeVideo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHomeVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedHomeVideo = await updateHomeVideo(req.params.id, req.body);
    res.status(200).json({
      message: "Home video updated successfully",
      data: updatedHomeVideo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHomeVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteHomeVideo(req.params.id);
    res.status(200).json({
      message: "Home video deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
