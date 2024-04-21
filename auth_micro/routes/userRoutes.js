import { Router } from "express";
import { UserController } from "../controller/UserController.js";



const userRoutes = Router();

userRoutes.get("/getUser/:id",UserController.getUser);
userRoutes.post("/getUsers",UserController.getUsers);

export default userRoutes;