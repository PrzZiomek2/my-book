/**
 * @jest-environment node
*/

import { createMocks } from 'node-mocks-http';
import clientPromise from '@/mongoDB/utils/mongoClient';
import { POST } from '@/app/api/profile/route';
import { POST as POSTTags } from '@/app/api/profile/tags/route';
import { GET } from '@/app/api/profile/[id]/route';

const testUserId = "657e0899175d6604bfeac7eb";
const testUserProfile = {
   name: "testu", 
   description: "test", 
   image: "../assets/imagees/test_avatar.jpg",
   tags: ["historia", "sinologia"],
   id: testUserId
 };
const testDescription = "testowy opis użytkownika";

describe("test /api/profile route", () => {

   afterAll(async () => {
      const client = await clientPromise;
      await client.close();
   });

   it(`should add user profile data`, async () => {
      const { req } = createMocks({
         method: 'POST',
         json: jest.fn(() => testUserProfile),
      });
      
      const postRes = await POST(req); 
      const {success} = await postRes.json(); 
      
      expect(success).toBeTruthy();
   });

   it(`should return user profile if match provided id`, async () => {
      const params = { id: testUserId };
      const { req } = createMocks({
         method: 'GET',
         body: {},
      });

      const res = await GET(req, {params});
      const {profile} = await res.json(); 
      const {_id, ...profileData} = profile;
      
      expect(profileData).toEqual(testUserProfile);
   });

   it(`should throw an error if user profile not found`, async () => {
      const params = { id: "xd" };
      const { req } = createMocks({
         method: 'GET',
         body: {},
      });

      expect(async () => {
         await GET(req, {params})
      })
      .rejects
      .toThrow(Error)
   });

   describe("test /api/profile/tags sub route", () => {

      it(`should return tags from OpenAI if profile description was provided`, async () => {
         const { req } = createMocks({
            method: 'POST',
            json: jest.fn(() => ({description: testDescription})),
         });
         
         const postRes = await POSTTags(req); 
         const {completion} = await postRes.json(); 
         const resObj = JSON.parse(completion); 
         const tagsArray = Object.values(resObj?.words);
   
         expect(tagsArray).toBeInstanceOf(Array);
         expect(tagsArray.length).toBeGreaterThanOrEqual(1);
      });
   
      it(`should throw an error if profile description was not provided for OpenAI`, async () => {
         const { req } = createMocks({
            method: 'POST',
            json: jest.fn(() => ({description: ""})),
         });
         
         expect(async () => {
            await POSTTags(req);
         }) 
         .rejects
         .toThrow(Error);  
      });
   })

}); 
