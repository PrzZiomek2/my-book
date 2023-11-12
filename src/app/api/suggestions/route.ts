import clientPromise from '../../../mongoDB/utils/mongoClient';
import { NextResponse } from 'next/server';

interface RequestBody { 
   description: string,
   id: string,
   image: File,
   tags: []   
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json(); 
   console.log({body});
   
   return NextResponse.json({ message: "res" });
}
