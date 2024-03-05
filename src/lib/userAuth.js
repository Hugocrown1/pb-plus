const session = await getServerSession(authOptions);

export const verifyUser = (id) => {
  if (session === null) return false;
  return id === session.user.id || session.user.role === "admin";
};

export const isAdmin = () => {
  if (session === null) return false;
  return session.user.role === "admin";
};
