import prisma from "@/lib/prisma";
import NewsList from "./NewsList";

export default async function NewsAdmin() {
    const newsList = await prisma.news.findMany({ 
        orderBy: { createdAt: "desc" } 
    });

    return <NewsList initialNews={newsList} />;
}
