import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditGalleryForm from "./EditGalleryForm";

export default async function EditGalleryPage({ params }: { params: { id: string } }) {
    const gallery = await prisma.gallery.findUnique({
        where: { id: params.id },
    });

    if (!gallery) {
        notFound();
    }

    return <EditGalleryForm gallery={gallery} />;
}
