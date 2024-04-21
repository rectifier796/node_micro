import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const authRoutes = Router();

authRoutes.post("/auth/register", AuthController.register);
authRoutes.post("/auth/login", AuthController.login);

authRoutes.get("/auth/user",authMiddleware,AuthController.user);

export default authRoutes;