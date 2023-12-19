/**
 * @jest-environment node
*/

import { createMocks } from 'node-mocks-http';
import clientPromise from '@/mongoDB/utils/mongoClient';
import { GET, POST } from '@/app/api/opinion/[id]/route';
import { Opinion } from '@/types/interfaces';

const testUserId = "657e0899175d6604bfeac7eb";
const bookId = "LvYd0AEACAAJ";
const testOpinion = {
   author: {id: testUserId, name: "testu"},
   content: "testowa opinia",
   bookId,
   rate: 3
};

describe("test api/opinion/[id] route", () => {
   const params = { id: testUserId };

   afterAll(async () => {
      const client = await clientPromise;
      await client.close();
   });

   it("should add an opinion to opinion colection", async () => {
      const { req: postReq } = createMocks({
         method: 'POST',
         json: jest.fn(() => ({opinion: testOpinion})),
      });

      const postRes = await POST(postReq, {params}); 
      const resj = await postRes.json(); 
      
      expect(resj.success).toBe(true);
   });

   it("should throw an error if book id or author id was not provided with opinion", async () => {
      const {bookId, ...opinionWithoutId} = testOpinion;
      const { req: postReq } = createMocks({
         method: 'POST',
         json: jest.fn(() => ({opinion: opinionWithoutId})),
      });
      
      expect(async () => await POST(postReq, {params}))
         .rejects
         .toThrow(Error);
   });

   it("should return opinions with content and rates", async () => {
      const params = { id: bookId };
      const { req } = createMocks({
         method: 'POST',
         body: {}
      });     

      const res = await GET(req, {params});
      const {opinions} = await res.json(); 
      const areOpinionsCorrect = opinions?.every(({opinion}: {opinion: Opinion}) => opinion.content && opinion.rate);
      
      expect(areOpinionsCorrect).toBe(true);
   })
})