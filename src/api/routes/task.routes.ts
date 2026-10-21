
import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import {
    createTaskHandler, 
    listTasks,
    showTask,
    updateTaskHandler,
    deleteTaskHandler } 
from "../../controllers/task.controller.js";

const router = Router();

router.use(authenticateToken);

router.get("/", listTasks);
router.get("/:id", showTask);
router.post("/", createTaskHandler);
router.put("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;