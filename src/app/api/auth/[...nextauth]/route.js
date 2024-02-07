import { connectDB } from "@/lib/mongoose";
import Users from "@/models/users";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      async authorize(credentials) {
        await connectDB();
        const { email, password } = credentials;
        const user = await Users.find({ email });
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
  },
};

export async function auth() {
  return await getServerSession(authOptions);
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
