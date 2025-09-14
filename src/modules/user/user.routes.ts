import { Router } from "express";
import { userController } from "./user.controllers";

const router = Router();

router.get("/", userController.getAllUser);
router.post("/", userController.createUser);

export const userRouter = router;