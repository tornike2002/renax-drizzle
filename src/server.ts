import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).json({ message });
});

export default app;
