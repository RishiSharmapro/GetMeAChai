import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import User from '@/models/User'
import Payment from '@/models/Payment'
import mongoose from 'mongoose'

export const authOptions =  NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks :{
    async signIn({ user, account, profile, email, credentials }){
      if(account.provider == 'github'){
        // connect to database
        const client = await mongoose.connect(process.env.MONGODB_URI)

        // check if user exists
        const userExists = await User.findOne({email: user.email})
 
        if(!userExists){
          const newUser = new User({
            name: user.name,
            email: user.email,
            username: user.email.split('@')[0],
            profilepicture: profile.avatar_url,
            // coverpicture: profile.avatar_url,
            // razorpayid: process.env.RAZORPAY_ID,
            // razorpaysecret: process.env.RAZORPAY_SECRET
          })
          await newUser.save()
          user.name = newUser.username
        }
        else {
          user.name = userExists.username
        }
        return true
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      session.user = dbUser
      return session
    },
  },
})

export { authOptions as GET, authOptions as POST }
