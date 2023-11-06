import isEqual from 'lodash.isequal';
import clientPromise from '@/mongoDB/utils/mongoClient';
import { NextResponse } from 'next/server';
import { BookDefault, CustomBook, UserBooks } from '@/types/interfaces';

interface RequestBody {
   book: CustomBook;
}

export async function POST(req: Request, {params}:{params: {id: string}}) {
   const { book }: RequestBody = await req.json(); 
   const userId = params.id; 
   const client = await clientPromise;
   const db = client.db("library"); 
   let bookUpdated = null;
   const bookList = await db.collection<UserBooks>("user_books").findOne({ userId });  
   const bookExists = bookList && bookList.books.find(({id}) => id === book.id); 
   const bookNotModified = isEqual(book, bookExists);

   if(!bookNotModified){
     const userList = await db.collection<UserBooks>("user_books").findOne({userId});
     if(userList){
      bookUpdated = await db.collection<UserBooks>("user_books").findOneAndUpdate({ userId }, {$push: {books: book}});
      return NextResponse.json({ message: "dane zaktualizowano", success: bookUpdated.ok });
     };

     const createdList = await db.collection<UserBooks>("user_books").insertOne({ userId, books: [book]});
     return NextResponse.json({ message: "dane zaktualizowano", success: createdList.acknowledged });
   }

   return NextResponse.json({ message: "pozycja już była zapisana" });
}


export async function GET(request: Request, {params}:{params: {id: string}}) {
   const client = await clientPromise;
   const db = client.db("library"); 
   const userId = params.id; 

   const user = await db.collection<UserBooks>("user_books").findOne({ userId }); 

   return NextResponse.json({ books: user?.books });
}
