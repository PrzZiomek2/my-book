import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
   providers: [
      CredentialsProvider({
         name: "Credentials",
         
         credentials: {
           email: { label: "Username", type: "text" },
           password: { label: "Password", type: "password" }
         },

         async authorize(credentials, req) {
            console.log({credentials});
            
            const res = await fetch("http://localhost:3000/api/login", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  username: credentials?.email,
                  password: credentials?.password
               })
            });

            const user = await res.json();        

            if (user) {
               return user
            } else {
               return null
            }
         }
       }),
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!
       })
   ],
   callbacks: {
      async jwt({token, user}) { console.log({user});
         if (user) {
            token.user = user;
         }
         return token;
      },

      async session({session, user, token}) { 
         session.user = token.user; 
         
         return session;
       }, 
   },
   pages: {
      signIn: "/auth/signin"
   }
});

export { handler as GET, handler as POST };