import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
});

export const getUser = cache(async () => {
  const session = await getSession();
  if (!session?.user) return null;
  return session.user;
});
