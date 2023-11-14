import { NextResponse } from 'next/server';

import { openai } from '@/lib/openai';
import { UserPreferencesParsed } from '@/types/interfaces';
import { suggestionsOnUserProfile } from '@/utils/chatCommands';

export async function POST(req: Request) {
   const body: UserPreferencesParsed = await req.json(); 
   const {tags, read, favourite} = body;
   
   const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [{
         role: "user",
         content: suggestionsOnUserProfile({
            tags, 
            read, 
            favourite
         })
      }]
    }).catch(err => console.log(err)); 
    
    const {choices} = completion || {};

   return NextResponse.json({ completion: choices?.[0].message.content});
};
