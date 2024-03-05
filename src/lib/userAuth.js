const session = await getServerSession(authOptions);

export const verifyUser = (id) => {
  return id === session.user.id || session.user.role === "admin";
};

export const isAdmin = () => {
  return session.user.role === "admin";
};
