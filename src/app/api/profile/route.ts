import clientPromise from '../../../mongoDB/utils/mongoClient';
import { NextResponse } from 'next/server';

interface RequestBody {
   name: string, 
   description: string,
   id: string,
   image: File,
   tags: []   
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json(); 
   const client = await clientPromise;
   const db = client.db("library"); 
   let userUpdated = null;
   const userExists = await db.collection("profiles").findOne({ id: body.id }); 

   if(userExists){
     userUpdated = await db.collection("profiles").findOneAndUpdate({ id: body.id }, {$set: body});
     console.log({userUpdated});
     return NextResponse.json({ message: "dane zaktualizowano", success: userUpdated.ok });
   }

   userUpdated = await db.collection("profiles").insertOne(body);

   return NextResponse.json({ message: "Zostałeś dodany", success: Boolean(userUpdated.insertedId) });
}
