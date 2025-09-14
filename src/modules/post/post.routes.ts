import { Router } from "express";
import { postController } from "./post.controllers";

const router = Router();

router.get("/", postController.getAllPost);
router.post("/", postController.createPost);
router.get("/:id", postController.getByPost);

export const postRouter = router;