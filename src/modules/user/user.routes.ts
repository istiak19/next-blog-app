import { Router } from "express";
import { userController } from "./user.controllers";

const router = Router();

router.get("/", userController.getAllUser);
router.post("/", userController.createUser);
router.get("/:id", userController.getByUser);

export const userRouter = router;