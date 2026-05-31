import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export async function requireAdminUser() {
  const user = await currentUser();
  const email = user?.emailAddresses.find((item) => item.id === user.primaryEmailAddressId)?.emailAddress;
  const allowedEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (!user || !email || !allowedEmails.includes(email.toLowerCase())) {
    notFound();
  }

  return { user, email };
}

export async function assertAdminApi() {
  const user = await currentUser();
  const email = user?.emailAddresses.find((item) => item.id === user.primaryEmailAddressId)?.emailAddress;
  const allowedEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (!user || !email || !allowedEmails.includes(email.toLowerCase())) {
    return false;
  }

  return true;
}
