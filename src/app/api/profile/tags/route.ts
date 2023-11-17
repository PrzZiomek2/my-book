import { NextResponse } from 'next/server';  

import { getOpenaiCompletion, openai } from '@/lib/openai';
import { giveKeywordsFromProfileDescription } from '@/utils/chatCommands';

interface RequestBody {
   description: string; 
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json(); 

   const completion = await getOpenaiCompletion({
      content: giveKeywordsFromProfileDescription(body.description.substring(0, 600))
   })
   .catch(err => console.log(err)); 
   

   return NextResponse.json({ completion });
}
