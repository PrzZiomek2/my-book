import { NextResponse } from "next/server";
import clientPromise from "@/mongoDB/utils/mongoClient";
import { CustomBook, Opinion, OpinionRes } from "@/types/interfaces";

export async function GET(request: Request) {
   const client = await clientPromise;
   const db = client.db("library"); 

   const books = await db.collection<CustomBook>("books").find({}).toArray(); 
   const opinions = await db.collection<OpinionRes>("opinions").find({}).toArray(); 

   const opinionsByBook: {[key: string]: Opinion[]} = {};

   if(opinions.length){ 
      opinions.forEach(({opinion}) => {
         const {bookId} = opinion;
         if(!opinionsByBook[bookId]){
            opinionsByBook[bookId] = []
         };
         opinionsByBook[bookId].push(opinion);
      })
   };

   const booksWithOpinions = books.map(book => ({
      ...book,
      opinions: opinionsByBook[book.id]
   }))

   return NextResponse.json({ books: booksWithOpinions });
}