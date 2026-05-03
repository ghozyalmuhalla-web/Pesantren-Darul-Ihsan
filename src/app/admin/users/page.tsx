import prisma from "@/lib/prisma";
import UserList from "./UserList";

export default async function UsersAdminPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <UserList users={users} />;
}
