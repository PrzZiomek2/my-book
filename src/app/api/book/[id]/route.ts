import { NextResponse } from "next/server";
import clientPromise from "@/mongoDB/utils/mongoClient";
import { CustomBook, UserBooks } from "@/types/interfaces";


export async function GET(request: Request, {params}:{params: {id: string}}) {
   const client = await clientPromise;
   const db = client.db("library"); 
   const bookId = params.id; 

   const book = await db.collection<CustomBook>("books").findOne({ id: bookId }); 
   
   return NextResponse.json({ book });
}

export async function POST(req: Request, {params}:{params: {id: string}}) {
   const book: CustomBook = await req.json(); 
   const client = await clientPromise;
   const db = client.db("library"); 
   let bookUpdated = null;
   const bookId = params.id; 
   const existingBook = await db.collection<CustomBook>("books").findOne({id: bookId});

   if(existingBook){ 
     bookUpdated = await db.collection<UserBooks>("books").findOneAndUpdate({ id: bookId }, {$set: book});
     return NextResponse.json({ message: "dane zaktualizowano", success: bookUpdated.ok });
   };  
   
   bookUpdated = await db.collection("books").insertOne(book);

   return NextResponse.json({ message: "Książka dodana", success: Boolean(bookUpdated.insertedId) });
}
