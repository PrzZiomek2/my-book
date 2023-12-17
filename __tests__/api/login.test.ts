/**
 * @jest-environment node
*/

import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/login/route';
import clientPromise from '@/mongoDB/utils/mongoClient';

const testUser = {
   username: "test@wp.pl",
   password: "test123"
}

describe("test /api/login route", () => {

   afterAll(async () => {
      const client = await clientPromise;
      await client.close();
   });

   it("should return user with accessToken if login data are correct", async () => {
      const { req } = createMocks({
         method: 'POST',
         json: jest.fn(() => testUser),
      });

      const postRes = await POST(req); 
      const {user, accessToken} = await postRes.json();   
      
      expect(user.email).toStrictEqual(testUser.username);
      expect(typeof accessToken).toBe("string");
      expect(accessToken.length).toBeGreaterThan(10);
   });

   it("should return null if provided login data are incorrect", async () => {
      const { req } = createMocks({
         method: 'POST',
         json: jest.fn(() => ({
            username: "test",
            password: "xdxdxd"
         })),
      });

      const postRes = await POST(req); 
      const resJson = await postRes.json();   
      
      expect(resJson).toBeNull();
   });
})