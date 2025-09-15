import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const getAllPost = async (page: number, limit: number, search: string, isFeatured?: boolean, tags?: string[], sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc") => {
    const skip = (page - 1) * limit;
    let where: any = {
        ...(isFeatured !== undefined && { isFeatured }),
        ...(tags && { tags: { hasSome: tags } }),
        OR: [
            {
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            {
                content: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        ]
    }
    const post = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
            [sortBy]: sortOrder === "asc" ? "asc" : "desc"
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

    const total = await prisma.post.count({ where });

    return {
        data: post,
        pagination: {
            skip,
            limit,
            totalPages: Math.ceil(total / limit)
        },
        total
    };
};

const getByPost = async (id: number) => {
    const result = await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        const post = await tx.post.findUnique({
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
    });

    return result;
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