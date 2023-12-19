import clientPromise from '@/mongoDB/utils/mongoClient';
import { NextResponse } from 'next/server';
import { Opinion } from '@/types/interfaces';

export async function POST(req: Request, {params}:{params: {id: string}}) {
   const opinion = await req.json(); 
   const client = await clientPromise;
   const db = client.db("library"); 
   const addDate = new Date();
   const opinionUpdated = {...opinion, timestamp: addDate};

   if(!opinion.opinion?.bookId || !opinion.opinion?.author.id){
      throw new Error("opinion identifier not provided");
   }
   
   const opinionAdded = await db.collection("opinions").insertOne(opinionUpdated); 

   return NextResponse.json({ 
      message: "Opinia dodana", 
      success: Boolean(opinionAdded.insertedId),
   });
}

export async function GET(request: Request, {params}:{params: {id: string}}) {
   const client = await clientPromise;
   const db = client.db("library"); 
   const bookId = params.id; 

   const opinions = await db.collection("opinions")
      .find({"opinion.bookId": bookId})
      .toArray(); 
   
   return NextResponse.json({ opinions });
}