'server-only';
import OpenAI from "openai";

export const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
});

type GetOpenaiCompletionArgs = {
   content: string;
   model?: string;
   temperature?: number;
 } 

export const getOpenaiCompletion = async ({
   content, 
   model = "gpt-3.5-turbo-1106", 
   temperature = 0.4
 }: GetOpenaiCompletionArgs) => {
 
   if(!content) throw new Error("content must be provided!")
 
   const completion = await openai.chat.completions.create({
     model,
     temperature,
     response_format: { type: "json_object" },
     messages: [{
        role: "user",
        content
     }]
   }).catch(err => console.log(err)); 
 
  const {choices} = completion || {}; 
 
  return choices?.[0].message.content;
 }