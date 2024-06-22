import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const glopalPrismaClient = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined 
};

const prisma = glopalPrismaClient.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV === 'development') {
    glopalPrismaClient.prisma = prisma;
}