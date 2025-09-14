import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const getAllUser = async () => {
    const createdUser = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            phone: true,
            role: true,
            status: true,
            Picture: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return createdUser;
};

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const createdUser = await prisma.user.create({
        data: payload
    });

    return createdUser;
};

export const userService = {
    getAllUser,
    createUser
};