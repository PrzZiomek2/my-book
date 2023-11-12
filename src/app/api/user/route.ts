import * as bcrypt from 'bcrypt'

import clientPromise from '../../../mongoDB/utils/mongoClient';

interface RequestBody {
   name: string;
   email: string;
   password: string;
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json(); 
   const client = await clientPromise;
   const db = client.db("library");
   
   const userExists = await db.collection("users").findOne({ email: body.email }); 

   if(userExists){
      return new Response(JSON.stringify(
         {error: "ten adres email jest już zajęty"}), 
         {status: 404}
      )
   }
   
   const newUser = {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10)
   }

   const addedUser = await db.collection("users").insertOne(newUser); 
   const {password, ...user} = addedUser; console.log({addedUser});
   return new Response(JSON.stringify(user)); 
}
