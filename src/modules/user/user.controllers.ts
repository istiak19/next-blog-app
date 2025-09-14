import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.status(200).json(result);
};

const getByUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userService.getByUser(Number(id));
    res.status(200).json(result);
};

const createUser = async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
};

export const userController = {
    getAllUser,
    getByUser,
    createUser
};