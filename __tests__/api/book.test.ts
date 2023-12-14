/**
 * @jest-environment node
*/
  
import { Db, MongoClient } from 'mongodb';
import { NextResponse } from "next/server";
import { createMocks } from 'node-mocks-http';
/*
jest.mock('next/server', () => {
   return {
     ...jest.requireActual('next/server'),
     NextResponse: {
       json: jest.fn(),
     },
   };
});
*/
const bookId = "LvYd0AEACAAJ";

describe("test /api/book/[id] route", () => {
   let client: MongoClient;
   let db: Db;

   async function GET(_: Request, {params}:{params: {id: string}}) {
      const bookId = params.id; 
      const book = await db.collection("books").findOne({ id: bookId });       
      return NextResponse.json({ book });
   }

   beforeAll(async () => {
      client = new MongoClient(process.env.TEST_MONGO_URI!);
      const clientDb = await client.connect();
      db = clientDb.db("library"); 
    });
  
   afterAll(async () => {
      await client.close();
   });

   it("should return book by given id", async () => {
      const params = { id: bookId };
      const { req } = createMocks({
         method: 'GET',
         body: {},
      });

      const res = await GET(req, {params});
      const {book} = await res.json();
      
      expect(book).toHaveProperty("id");
      expect(book.id).toEqual(bookId);
   });

   it("should return null if book not found", async () => {
      const params = { id: "xd" };
      const { req } = createMocks({
         method: 'GET',
         body: {},
      });

      const res = await GET(req, {params}); 
      const {book} = await res.json(); 
      
      expect(book).toBeNull();
   });

})


