"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const getUsers = async () => {
  const { sessionClaims } = await auth();

  const clerk = await clerkClient();

  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? "Anonymous",
    avatar: user.imageUrl,
  }));

  return users;
};
