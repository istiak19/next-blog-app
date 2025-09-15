import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await authService.login(payload.email, payload.password);
    res.status(200).json(result);
};

export const authController = {
    login
};
