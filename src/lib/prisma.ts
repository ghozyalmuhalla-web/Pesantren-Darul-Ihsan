import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const dbPath = "file:" + path.resolve(process.cwd(), "prisma/dev.db").replace(/\\/g, "/");

declare global {
    var prismaGlobal: PrismaClient | undefined;
}

function createPrismaClient() {
    const adapter = new PrismaLibSql({ url: dbPath });
    return new PrismaClient({ adapter });
}

const prisma = globalThis.prismaGlobal ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
