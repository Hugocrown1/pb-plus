import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const verifyUser = async (id) => {
  const session = await getServerSession(authOptions);

  if (session === null) return false;
  return id === session.user.id || session.user.role === "admin";
};

export const isAdmin = async () => {
  const session = await getServerSession(authOptions);

  if (session === null) return false;
  return session.user.role === "admin";
};
