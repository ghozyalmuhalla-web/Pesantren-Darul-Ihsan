import prisma from "@/lib/prisma";
import PendaftaranList from "./PendaftaranList";

export default async function PendaftaranAdmin() {
    const list = await prisma.pendaftaran.findMany({
        orderBy: { createdAt: "desc" }
    });

    return <PendaftaranList initialList={list} />;
}
