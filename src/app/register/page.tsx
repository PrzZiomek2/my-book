"use client";
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

import {RegisterForm} from '@/components/register/RegisterForm';

type FormValues = {
   name: string;
   email: string;
   password: string;
 }

export default function Register() {

   const router = useRouter();
   const [error, setError] = useState("");

   const createAccount = async (data: SubmitHandler<FormValues>) => { 

      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name, 
          email: data.email,
          password: data.password
        }),
      })
      .catch(err => console.log("err when adding user", err));

      if(!res) return; 

      const resJson = await res.json(); 

      if(resJson?.error){
         setError(resJson.error);
      }
      
      if(resJson?.insertedId){
         router.push("/auth/signin");
      }
   }; 

  return (
      <RegisterForm createAccount={createAccount} />
  )
}
