import { Request, Response } from "express";
import { postService } from "./post.service";

const getAllPost = async (req: Request, res: Response) => {
    const result = await postService.getAllPost();
    res.status(200).json(result);
};

const getByPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await postService.getByPost(Number(id));
    res.status(200).json(result);
};

const createPost = async (req: Request, res: Response) => {
    const result = await postService.createPost(req.body);
    res.status(201).json(result);
};

const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await postService.updatePost(req.body, Number(id));
    res.status(200).json(result);
};

const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await postService.deletePost(Number(id));
    res.status(200).json(result);
};

export const postController = {
    getAllPost,
    getByPost,
    createPost,
    updatePost,
    deletePost
};