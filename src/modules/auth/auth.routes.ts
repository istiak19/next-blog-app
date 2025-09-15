import { Router } from "express";
import { authController } from "./auth.controllers";

const router = Router();

router.post("/login", authController.login);
router.post("/google", authController.authWithGoogle);

export const authRouter = router;