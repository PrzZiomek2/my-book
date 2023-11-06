import * as bcrypt from 'bcrypt'

import clientPromise from '../../../mongoDB/utils/mongoClient';
import { signJwtToken } from '@/lib/jwt';

interface RequestBody {
   username: string;
   password: string;
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json();
   const client = await clientPromise;
   const db = client.db("library");
   
   const user = await db.collection("users").findOne({ email: body.username });    
   
   if(user && (await bcrypt.compare(body.password, user.password))){
      const { password, ...userNoPassword } = user;
      const accessToken = signJwtToken(userNoPassword);
      const result = {
         user: userNoPassword,
         accessToken
      };
      return new Response(JSON.stringify(result));
   }
   else{
      return new Response(JSON.stringify(null));
   }  
}