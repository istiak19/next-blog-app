import { Router } from "express";
import { userController } from "./user.controllers";

const router = Router();

router.get("/", userController.getAllUser);
router.post("/", userController.createUser);
router.get("/:id", userController.getByUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;