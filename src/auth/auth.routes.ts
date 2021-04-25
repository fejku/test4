import { Router } from "express";
import { validateParams, register } from "./auth.controller";

const router = Router();

router.post("/register", validateParams, register);

export default router;
