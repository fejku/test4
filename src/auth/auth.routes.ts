import { Router } from "express";
import { createRegisterController } from "./register";

const router = Router();

router.post("/register", createRegisterController.validateParameters, createRegisterController.execute);
// router.post("/login", validateParams, login);

export default router;
