import { db } from "@/db";
import { video } from "@/db/schema";
import { CreateHomeVideoType, UpdateHomeVideoType } from "./schema";
import { desc, eq } from "drizzle-orm";

export const createHomeVideo = async (data: CreateHomeVideoType) => {
  try {
    const [newHomeVideo] = await db
      .insert(video)
      .values({
        title: data.title,
        carModel: data.carModel,
        monthlyPrice: data.monthlyPrice,
        carType: data.carType,
        videoUrl: data.videoUrl,
      })
      .returning();
    return newHomeVideo;
  } catch (error) {
    throw new Error("Failed to create home video");
  }
};

export const getHomeVideo = async () => {
  try {
    const [data] = await db.select().from(video).orderBy(desc(video.createdAt));
    return data;
  } catch (error) {
    throw new Error("Failed to get home video");
  }
};

export const updateHomeVideo = async (
  id: string,
  data: UpdateHomeVideoType
) => {
  try {
    const [existingVideo] = await db
      .select()
      .from(video)
      .where(eq(video.id, id));
    if (!existingVideo) {
      throw new Error("Home video not found");
    }
    const updatedHomeVideo = await db
      .update(video)
      .set(data)
      .where(eq(video.id, id))
      .returning();
    return updatedHomeVideo;
  } catch (error) {
    throw new Error("Failed to update home video");
  }
};

export const deleteHomeVideo = async (id: string) => {
  try {
    const [existingVideo] = await db
      .select()
      .from(video)
      .where(eq(video.id, id));
    if (!existingVideo) {
      throw new Error("Home video not found");
    }
    await db.delete(video).where(eq(video.id, id));
    return;
  } catch (error) {
    throw new Error("Failed to delete home video");
  }
};
