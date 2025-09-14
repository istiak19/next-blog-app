import { Router } from "express";
import { postController } from "./post.controllers";

const router = Router();

router.post("/", postController.createPost);

export const postRouter = router;