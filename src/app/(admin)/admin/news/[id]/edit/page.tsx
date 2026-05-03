import prisma from "@/lib/prisma";
import EditNewsForm from "./EditNewsForm";
import { notFound } from "next/navigation";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) notFound();
    return <EditNewsForm news={news} />;
}
