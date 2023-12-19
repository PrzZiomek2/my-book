/**
 * @jest-environment node
*/
  
import { GET } from '@/app/api/ranking/route';
import clientPromise from '@/mongoDB/utils/mongoClient';
import { RankingBook } from '@/types/interfaces';
import { createMocks } from 'node-mocks-http';

describe("test /api/book/ranking route", () => {

   afterAll(async () => {
      const client = await clientPromise;
      await client.close();
   });

   it("should return book ranking list", async () => {
      const { req } = createMocks({
         method: 'GET',
         body: {},
      });

      const res = await GET(req);
      const {books} = await res.json(); 
      const firstItem = books[0];
      
      expect(firstItem && typeof firstItem === "object").toBe(true);
   });

   it("every book in ranking list should have a rate with opinion", async () => {
      const { req } = createMocks({
         method: 'GET',
         body: {},
      });

      const res = await GET(req);
      const {books} = await res.json(); 
      const allBooksRated = books?.every((book: RankingBook) => book.opinions && book.rate.length);
      
      expect(allBooksRated).toBe(true);
   })
})