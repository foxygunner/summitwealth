import { UserAuthForm } from "@/components/auth/user-auth-form";
import prisma from "@/lib/prisma";
import { searchParamsCache } from "../search-params";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { ref } = searchParamsCache.parse(searchParams);

  const referrer = await prisma.user.findUnique({
    where: { id: ref || "" },
    select: { id: true, name: true },
  });

  return <UserAuthForm referrer={referrer} />;
}
