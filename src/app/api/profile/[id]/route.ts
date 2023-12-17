import clientPromise from "@/mongoDB/utils/mongoClient";
import { NextResponse } from "next/server";


export async function GET(request: Request, {params}:{params: {id: string}}) {
   const client = await clientPromise;
   const db = client.db("library"); 

   const profile = await db.collection("profiles").findOne({ id: params.id }); 
   
   if(!profile){
      throw new Error("error when fetching profile");
   }
   
   return NextResponse.json({ profile });
}