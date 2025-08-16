import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import { signInSchema } from "@/models/SignIn"
import { connectDB } from "@/db/connect"
import User from "@/models/User"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github, Google,
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        console.log('Authorizing user with credentials: ', credentials);

        try {
          let user = null
 
          console.log('Parsing credentials ');
          const { email, password } = await signInSchema.parseAsync(credentials)
          console.log('Parsed credentials: ', { email, password });
          // logic to salt and hash password
          // const pwHash = saltAndHashPassword(password)
 
          // logic to verify if the user exists
          // user = await getUserFromDb(email, password)
 
          // if (!user) {
          //   throw new Error("Invalid credentials.")
          // }
 
          // return JSON object with the user data
          // return user
          return { email, password } // Replace with actual user data from your database
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Zod validation failed", error.flatten());
            return null;
          } else {
            console.error("Unexpected error in authorize():", error);
            throw error;
          }
        }
      },
    })
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      console.log(`Creating new user: ${user}`);
      if (!existingUser) {
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
    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.username = dbUser.username;
        session.user.image = dbUser.avatar;
      }

      return session;
    },
  }
})