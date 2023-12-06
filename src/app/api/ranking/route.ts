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

   const getRateValue = (id: string) => { 
      const opinions = opinionsByBook[id];      
      const ratesSum = opinions?.reduce((a,b) => a + b.rate, 0);
      const amount = opinions?.length;
      return (ratesSum / amount).toFixed(2);
   };

   const ratedBooks = books.filter(({id}) => opinionsByBook[id]);

   const rankedBooks = ratedBooks.map(({id, volumeInfo, favourite, read}) => ({
      id,
      title: volumeInfo.title,
      authors: volumeInfo.authors.slice(0,3).join(","),
      rate: getRateValue(id),
      opinions: opinionsByBook[id]?.length,
      subtitle: volumeInfo.subtitle,
      infoLink: volumeInfo.infoLink,
      categories: volumeInfo.categories,
      imageLink: volumeInfo.imageLinks?.thumbnail,
      favourite,
      read
   }))

   return NextResponse.json({ books: rankedBooks });
}