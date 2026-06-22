import NextAuth from "next-auth"
import User from "@/models/User"
import { connectDB } from "@/db/connect"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github, Google],
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const dbUser = await User.findOne({ email: user.email }).lean();

      if (!dbUser) {
        const username = user.email.split("@")[0];

        await User.create({
          name: user.name || username,
          email: user.email,
          avatar: user.image,
          username,
          coverImage: 'https://picsum.photos/1000/400'
        });
      }

      return true;
    },
    async jwt({ token, user, trigger }) {

      if (trigger === "update") {
        await connectDB();

        const dbUser = await User.findOne({ email: token.email }).lean();
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.username = dbUser.username;
          token.avatar = dbUser.avatar;
          token.name = dbUser.name;
        }

        return token;
      }

      if (user) {
        await connectDB();
        
        const dbUser = await User.findOne({
          email: token.email,
        }).lean();
        
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.username = dbUser.username;
          token.avatar = dbUser.avatar;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.image = token.avatar;

      return session;
    },
  }
})