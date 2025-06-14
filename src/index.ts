import dotenv from "dotenv";
dotenv.config();
import app from "./server";
import { setupSwagger } from "./config/swagger";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  setupSwagger(app);
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer();
