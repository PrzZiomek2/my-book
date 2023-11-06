import clientPromise from "@/mongoDB/utils/mongoClient";
import { NextResponse } from "next/server";


export async function GET(request: Request, {params}:{params: {id: number}}) {
   const client = await clientPromise;
   const db = client.db("library"); 

   const profile = await db.collection("profiles").findOne({ id: params.id }); 

   return NextResponse.json({ profile });
}