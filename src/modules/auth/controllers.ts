import { Request, Response } from "express";
import { admin, refreshTokens } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";
import { generateToken, generateRefreshToken } from "./services";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const [existingAdmin] = await db
      .select()
      .from(admin)
      .where(eq(email, admin.email));

    if (existingAdmin) {
      res.status(400).json({
        message: "Admin already exists",
      });
      return;
    }
    const hashedPassword = await hash(password, 10);

    await db.insert(admin).values({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [adminAccount] = await db
      .select()
      .from(admin)
      .where(eq(email, admin.email));

    if (!adminAccount) {
      res.status(401).json({
        message: "Admin not found",
      });
      return;
    }
    const isPasswordValid = await compare(password, adminAccount.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }
    const token = generateToken(adminAccount.id);
    const refreshToken = generateRefreshToken(adminAccount.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const [storedToken] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, refreshToken));
    if (!storedToken) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const [existingAdmin] = await db
      .select()
      .from(admin)
      .where(eq(admin.id, payload.id));

    if (!existingAdmin) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const token = generateToken(existingAdmin.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Token refreshed successfully",
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const token = req.cookies.refreshToken;
      if (token) {
        await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
      }
      res.status(401).json({
        message: "Invalid refresh token",
      });
      return;
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logoutAdmin = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
    res.clearCookie("token").clearCookie("refreshToken").json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = req.admin.id;
    const [adminAccount] = await db
      .select()
      .from(admin)
      .where(eq(admin.id, userId));
    if (!adminAccount) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    res.status(200).json({
      message: "Admin fetched successfully",
      admin: adminAccount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
