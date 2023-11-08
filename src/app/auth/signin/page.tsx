"use client";
import React from 'react';

import { signIn } from 'next-auth/react';
import Container from '@mui/material/Container';

import {LoginForm} from '@/components/auth/signIn/LoginForm';
import { SubmitHandler } from 'react-hook-form';
import { AlertInfo } from '@/components/ui/AlertInfo';
import { ActionType, useFetchReducer } from '@/utils/customHooks/useFetchReducer';

type FormValues = {
  email: string;
  password: string;
}

export default function SignIn() {

  const [state, dispatch] = useFetchReducer();

  const onSubmit = async (data: SubmitHandler<FormValues>) => {
    try {
      dispatch({type: ActionType.FETCH_INIT})  

      const res = await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/"
      });

      dispatch({
        type: ActionType.FETCH_SUCCESS,
        payload: {}
      })
    } 
    catch (error) {
      dispatch({
        type: ActionType.FETCH_ERROR,
        error: `Niepoprawny login lub hasło`
      });
    }
  };

  return (
    <Container>
      <AlertInfo expand={!!state.error} content={state.error}/>
      <LoginForm 
        onSubmit={onSubmit} 
      />     
    </Container>
  )
}

