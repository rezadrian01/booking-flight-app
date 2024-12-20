"use server";

import prisma from "@/lib/prisma";

export const getCustomers = async () => {
    try {
        const data = await prisma.user.findMany({
            where: {
                role: "CUSTOMER"
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}