import { NextResponse } from 'next/server';

import { getOpenaiCompletion, openai } from '@/lib/openai';
import { UserPreferencesParsed } from '@/types/interfaces';
import { giveSuggestionsOnUserProfile } from '@/utils/chatCommands';
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
   tokensPerInterval: 1,
   interval: "day", 
   fireImmediately: true
})

export async function POST(req: Request) {
   const body: UserPreferencesParsed = await req.json(); 
   const {tags, read, favourite, temperature} = body;

   const remaining = await limiter.removeTokens(1); 
console.log({remaining});

   if(remaining < 0){ 
      return NextResponse.json(null, {
         status: 429,
         statusText: 'osiągnięto dzienny limit',
      });
   }

   const content = giveSuggestionsOnUserProfile({
      tags, 
      read, 
      favourite
   });

   const completion = await getOpenaiCompletion({
      content,
      temperature
   })
   .catch(err => console.log(err)); 

   return NextResponse.json({ completion });
};
