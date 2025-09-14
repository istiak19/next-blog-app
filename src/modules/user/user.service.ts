import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const getAllUser = async () => {
    const getUser = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            phone: true,
            role: true,
            status: true,
            Picture: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            Post: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return getUser;
};

const getByUser = async (id: number) => {
    const createdUser = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            phone: true,
            role: true,
            status: true,
            Picture: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            Post: true
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

const updateUser = async (payload: Prisma.UserCreateInput, id: number): Promise<User> => {
    const createdUser = await prisma.user.update({
        where: { id },
        data: payload
    });

    return createdUser;
};

const deleteUser = async (id: number) => {
    const createdUser = await prisma.user.delete({
        where: { id }
    });

    return createdUser;
};

export const userService = {
    getAllUser,
    getByUser,
    createUser,
    updateUser,
    deleteUser
};