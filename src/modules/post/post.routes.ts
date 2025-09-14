import { Router } from "express";
import { postController } from "./post.controllers";

const router = Router();

router.get("/", postController.getAllPost);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.get("/:id", postController.getByPost);
router.delete("/:id", postController.deletePost);

export const postRouter = router;