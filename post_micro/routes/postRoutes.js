import express from 'express';
import PostController from '../controller/PostController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const postRoutes = express.Router();

postRoutes.get("/post",PostController.index);
postRoutes.post("/post", authMiddleware, PostController.store);

export default postRoutes;