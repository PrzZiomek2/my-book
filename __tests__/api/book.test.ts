/**
 * @jest-environment node
*/
  
import clientPromise from '@/mongoDB/utils/mongoClient';
import { createMocks } from 'node-mocks-http';
import { generateRandomString } from '@/utils/handlers';
import { GET, POST } from '@/app/api/book/[id]/route';

jest.mock('next/server', () => {
   return {
     ...jest.requireActual('next/server'),
     NextResponse: {
       json: jest.fn(),
     },
   };
});

const bookId = "LvYd0AEACAAJ";
const updateSuccessMsg = "dane zaktualizowano"; 
const addedMessage = "Książka dodana";
const errorMessage = "Book data is corrupted";

describe("test /api/book/[id] route", () => {

   afterAll(async () => {
      const client = await clientPromise;
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

   it(`should return message '${updateSuccessMsg}' if book was successfully updated`, async () => {
      const params = { id: bookId };
      const { req: getReq } = createMocks({
         method: 'GET',
         body: {},
      });
      const res = await GET(getReq, {params}); 
      const {book} = await res.json(); 

      const { req: postReq } = createMocks({
         method: 'POST',
         json: jest.fn(() => book),
      });

      const postRes = await POST(postReq, {params}); 
      const resj = await postRes.json(); 
      
      expect(resj.message).toStrictEqual(updateSuccessMsg);
      expect(resj.success).toBeTruthy();
   });

   it(`should return message '${addedMessage}' if book was successfully added`, async () => {
      const id = generateRandomString();
      const params = { id };
      const newTestBook = {
         id,
         volumeInfo: { title: "test" },
         selfLink: "https://www.googleapis.com/books/v1/volumes/LvYd0AEACAAJ"
      };

      const { req: postReq } = createMocks({
         method: 'POST',
         json: jest.fn(() => newTestBook),
      });

      const postRes = await POST(postReq, {params}); 
      const resj = await postRes.json(); 
      
      expect(resj.message).toStrictEqual(addedMessage);
      expect(resj.success).toBeTruthy();
   });

   it(`should thrown an error if book could not be added`, async () => {
      const id = generateRandomString();
      const params = { id };
      const newTestBook = null;

      const { req: postReq } = createMocks({
         method: 'POST',
         json: jest.fn(() => newTestBook),
      });

      expect(async () => {
         await POST(postReq, {params});
      })
      .rejects.toThrow(errorMessage);
   });

})


