import { NextResponse } from 'next/server';

import { getOpenaiCompletion, openai } from '@/lib/openai';
import { UserPreferencesParsed } from '@/types/interfaces';
import { giveSuggestionsOnUserProfile } from '@/utils/chatCommands';

export async function POST(req: Request) {
   const body: UserPreferencesParsed = await req.json(); 
   const {tags, read, favourite, temperature} = body;

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
