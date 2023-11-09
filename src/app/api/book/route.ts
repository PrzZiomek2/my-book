import clientPromise from '@/mongoDB/utils/mongoClient';
import { NextResponse } from 'next/server';
import { BookDefault, CustomBook, UserBooks, BookType } from '@/types/interfaces';

export async function POST(req: Request) {
   const book: CustomBook = await req.json(); 
   const client = await clientPromise;
   const db = client.db("library"); 
   let bookUpdated = null;
   const existingBook = await db.collection<CustomBook>("books").findOne({id: book.id});   // console.log({book});

   if(existingBook){ 
     bookUpdated = await db.collection<UserBooks>("books").findOneAndUpdate({ _id: book._id }, {$set: book});
     return NextResponse.json({ message: "dane zaktualizowano", success: bookUpdated.ok });
   };  

   bookUpdated = await db.collection("books").insertOne(book);

   return NextResponse.json({ message: "Książka dodana", success: Boolean(bookUpdated.insertedId) });
}
