import NextAuth, { Session, User } from "next-auth";
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;
const AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;

if (!AUTH_GITHUB_ID || !AUTH_GITHUB_SECRET) {
  throw new Error("Missing Github OAuth Credentials!");
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: AUTH_GITHUB_ID,
      clientSecret: AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session && session.user && user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.name = user.name;
        session.user.image = user.image;
      }

      return session;
    },
  },
});
