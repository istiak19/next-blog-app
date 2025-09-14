import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    const result = await postService.createPost(req.body);
    res.status(201).json(result);
};

export const postController = {
    createPost
};