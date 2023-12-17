import { NextResponse } from 'next/server';  

import { getOpenaiCompletion, openai } from '@/lib/openai';
import { giveKeywordsFromProfileDescription } from '@/utils/chatCommands';

interface RequestBody {
   description: string; 
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json(); 
   const {description} = body;

   if(!description){
      throw new Error("no description data was provied");
   };;

   const completion = await getOpenaiCompletion({
      content: giveKeywordsFromProfileDescription(description.substring(0, 600))
   })
   .catch(err => console.log(err)); 
   

   return NextResponse.json({ completion });
}
