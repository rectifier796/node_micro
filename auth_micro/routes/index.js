import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/api",authRoutes);
router.use("/api",userRoutes);

export default router;