import { prisma } from "../../config/db";

const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User not found");
    };

    if (password === user.password) {
        return user
    } else {
        throw new Error("Password not match!!");
    }
};

export const authService = {
    login
};