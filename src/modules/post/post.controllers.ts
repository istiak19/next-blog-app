import { Request, Response } from "express";
import { postService } from "./post.service";

const getAllPost = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string || " ";
    const isFeatured = req.query.isFeatured ? req.query.isFeatured == "true" : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : undefined;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder: "asc" | "desc" = req.query.sortOrder === "asc" ? "asc" : "desc";

    const result = await postService.getAllPost(page, limit, search, isFeatured, tags, sortBy, sortOrder);
    
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

const getPostStar = async (req: Request, res: Response) => {
    const result = await postService.getPostStar();
    res.status(200).json(result);
};

export const postController = {
    getAllPost,
    getByPost,
    createPost,
    updatePost,
    deletePost,
    getPostStar
};