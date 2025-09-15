import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const getAllPost = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const post = await prisma.post.findMany({
        skip,
        take: limit,
        include: {
            author: {
                select: {
                    name: true,
                    phone: true,
                }
            }
        }
    });
    
    return post;
};

const getByPost = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: {
                select: {
                    name: true,
                    phone: true,
                }
            }
        }
    });
    return post;
};

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const post = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    name: true,
                    phone: true,
                }
            }
        }
    });
    return post;
};

const updatePost = async (payload: Prisma.PostCreateInput, id: number,): Promise<Post> => {
    const post = await prisma.post.update({
        where: {
            id
        },
        data: payload,
        include: {
            author: {
                select: {
                    name: true,
                    phone: true,
                }
            }
        }
    });
    return post;
};

const deletePost = async (id: number) => {
    const post = await prisma.post.delete({
        where: { id }
    });
    return post;
};

export const postService = {
    getAllPost,
    getByPost,
    createPost,
    updatePost,
    deletePost
};