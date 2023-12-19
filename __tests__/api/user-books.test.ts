/**
 * @jest-environment node
*/

import { createMocks } from 'node-mocks-http';
import clientPromise from '@/mongoDB/utils/mongoClient';
import { GET, POST } from '@/app/api/user-books/[id]/route';

const testUserId = "657e0899175d6604bfeac7eb";
const bookId = "LvYd0AEACAAJ";
const bookExample = {
   id: bookId,
   volumeInfo: {
      title: "test"
   },
   is_favourite: true,
   is_read: true
}

describe("test api/user-books/[id] route", () => {
   const params = { id: testUserId };

   afterAll(async () => {
      const client = await clientPromise;
      await client.close();
   });

   it("should add book to user book collection", async () => {
      const { req: postReq } = createMocks({
         method: 'POST',
         json: jest.fn(() => ({
            book: bookExample
         })),
      });

      const postRes = await POST(postReq, {params}); 
      const resj = await postRes.json(); 
      
      expect(resj).toBeTruthy();
   });

   it("should throw an error if no book was provided to add", async () => {
      const { req: postReq } = createMocks({
         method: 'POST',
         json: jest.fn(() => ({
            book: null
         })),
      });
      
      expect(async () => {
         await POST(postReq, {params}); 
      })
      .rejects
      .toThrow(Error);
   });

   it("should return user book collection", async () => {
      const { req } = createMocks({
         method: 'GET',
         body: {},
      });

      const res = await GET(req, {params}); 
      const {books} = await res.json(); 
      
      expect(typeof books[0] === "object").toBe(true);
      expect(books.length).toBeGreaterThanOrEqual(1);
   });
})