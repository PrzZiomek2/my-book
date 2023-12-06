import clientPromise from '@/mongoDB/utils/mongoClient';
import { CriteriaFormData } from '@/types/interfaces';
import { NextResponse } from 'next/server';

interface CriteriaDocument{
   userId: string; 
   data: CriteriaFormData;
}

export async function GET(request: Request, {params}:{params: {id: string}}) {
   const client = await clientPromise;
   const db = client.db("library"); 
   const userId = params.id; 
   
   const form = await db.collection<CriteriaDocument>("criteria_form").findOne({ userId }); 

   return NextResponse.json({ data: form?.data });
} 

 
export async function POST(req: Request, {params}:{params: {id: string}}) {
   const client = await clientPromise;
   const db = client.db("library"); 
   const body: CriteriaFormData  = await req.json();
   const userId = params.id; 
   
   const newForm = await db.collection<CriteriaDocument>("criteria_form").replaceOne(
      {userId}, 
      {userId, data: body},
      {upsert: true}
      ); 
      
   return NextResponse.json({ ok: newForm.acknowledged })  ;
}

