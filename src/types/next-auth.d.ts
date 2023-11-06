import NextAuth from 'next-auth';

declare module  "next-auth" {
   interface Session {
      expires: string;
      user: {
         accessToken: string;
         user: {
            _id: string;
            name: string;
            email: string;
         }
      }
   }
}