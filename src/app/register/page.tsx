"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { SubmitHandler } from "react-hook-form"

import {RegisterForm} from '@/components/register/RegisterForm';
import { ActionType, useFetchReducer } from '@/utils/customHooks/useFetchReducer';
import Container from '@mui/material/Container';
import { AlertInfo } from '@/components/ui/AlertInfo';
import { urls } from '@/utils/urls';

const {rootPath} = urls();

type FormValues = {
   name: string;
   email: string;
   password: string;
 }

export default function Register() {

   const router = useRouter();
   const [state, dispatch] = useFetchReducer();

   const createAccount = async (data: SubmitHandler<FormValues>) => { 
      dispatch({type: ActionType.FETCH_INIT});

      const res = await fetch(`${rootPath}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name, 
          email: data.email,
          password: data.password
        }),
      })
      .catch(err => {
         dispatch({
            type: ActionType.FETCH_ERROR,
            error: `Rejestracja nieudana, sprawdź podawane dane.`
          });
      });

      if(!res) return; 

      const resJson = await res.json(); 

      if(resJson?.error){
         dispatch({
            type: ActionType.FETCH_ERROR,
            error: resJson?.error
          });
      }
      
      if(resJson?.insertedId){
         router.push("/auth/signin");
      }
   }; 

  return (
   <Container>
      <AlertInfo expand={!!state.error} content={state.error}/>
      <RegisterForm createAccount={createAccount} />
   </Container>
  )
}
