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

const getPostStar = async () => {
    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.post.aggregate({
            _count: true,
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true },
            _sum: { views: true }
        });

        const featuredCount = await tx.post.count({
            where: {
                isFeatured: true
            }
        });

        const topFeatured = await tx.post.findFirst({
            where: { isFeatured: true },
            orderBy: { views: "desc" }
        });

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const lastWeekPostCount = await tx.post.count({
            where: {
                createdAt: {
                    gte: lastWeek
                }
            }
        });


        return {
            stats: {
                totalPosts: aggregates._count ?? 0,
                totalViews: aggregates._sum.views ?? 0,
                avgViews: aggregates._avg.views ?? 0,
                minViews: aggregates._min.views ?? 0,
                maxViews: aggregates._max.views ?? 0
            },
            featured: {
                count: featuredCount,
                topPost: topFeatured,
            },
            lastWeekPostCount
        };
    })
};

export const postService = {
    getAllPost,
    getByPost,
    createPost,
    updatePost,
    deletePost,
    getPostStar
};