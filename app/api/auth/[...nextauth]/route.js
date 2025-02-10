import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        /*
        The purpose of this session callback is to enrich the session object with additional information from the database. By adding the user's ID to the session, the application can easily access the user's unique identifier in client-side code, which can be useful for making authenticated API requests or displaying user-specific information.
        */
        async session({ session }){
            const sessionUser = await User.findOne({email: session.user.email});
            session.user.id = sessionUser._id.toString();
            return session;
        },

        // The profile value in the signIn callback is provided by NextAuth.js during the authentication process. When a user signs in using an OAuth provider like Google, NextAuth.js retrieves the user's profile information from the provider and passes it to the signIn callback.
        /*
        Example profile object provided by google:
        {
            "email": "user@example.com",
            "name": "John Doe",
            "picture": "https://lh3.googleusercontent.com/a-/AOh14Gh...",
            "sub": "123456789012345678901",
            "given_name": "John",
            "family_name": "Doe"
        }
        */
        async signIn({ profile }){
            try{

                // every next js route -> serverless route -> lambda function -> opens only when called
                await connectToDB();
                // check if a user already exists in the database
                const userExists = await User.findOne({ 
                    email: profile.email 
                });
                // if not create a new user and save it to the database
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                
    
                return true;

            } catch(error){
                console.log("Error signing in: ", error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };