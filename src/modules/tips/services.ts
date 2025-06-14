import { db } from "@/db";
import { tips } from "@/db/schema";
import { CreateTipsType, UpdateTipsType } from "./schema";
import { desc, eq } from "drizzle-orm";

export const createTips = async (data: CreateTipsType) => {
  try {
    const [newTips] = await db.insert(tips).values(data).returning();
    return newTips;
  } catch (error) {
    throw new Error("Failed to create tips");
  }
};

export const getTips = async () => {
  try {
    const [data] = await db
      .select()
      .from(tips)
      .orderBy(desc(tips.createdAt))
      .limit(3);
    return data;
  } catch (error) {
    throw new Error("Failed to get tips");
  }
};

export const updateTips = async (id: string, data: UpdateTipsType) => {
  try {
    const [existingTips] = await db.select().from(tips).where(eq(tips.id, id));
    if (!existingTips) {
      throw new Error("Tips not found");
    }
    const updatedTips = await db
      .update(tips)
      .set(data)
      .where(eq(tips.id, id))
      .returning();
    return updatedTips;
  } catch (error) {
    throw new Error("Failed to update tips");
  }
};

export const deleteTips = async (id: string) => {
  try {
    const [existingTips] = await db.select().from(tips).where(eq(tips.id, id));
    if (!existingTips) {
      throw new Error("Tips not found");
    }
    await db.delete(tips).where(eq(tips.id, id));
    return;
  } catch (error) {
    throw new Error("Failed to delete tips");
  }
};
