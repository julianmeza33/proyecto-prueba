
import taskRoutes from "./api/routes/task.routes.js";
import "dotenv/config";
import express from "express";
import cors from "cors";
import healthRoutes from "./api/routes/health.routes.js";
import authRoutes from "./api/routes/auth.routes.js";
import { errorHandler } from "./api/middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./api/swagger.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

