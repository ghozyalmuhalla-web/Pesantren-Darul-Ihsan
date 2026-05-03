import prisma from "@/lib/prisma";
import GalleryList from "./GalleryList";

export default async function GalleryAdmin() {
    const items = await prisma.gallery.findMany({ 
        orderBy: { createdAt: "desc" } 
    });

    return <GalleryList initialItems={items} />;
}
