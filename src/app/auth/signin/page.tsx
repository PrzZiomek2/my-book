"use client";
import React, { ChangeEvent, useState } from 'react';

import { signIn } from 'next-auth/react';
import Container from '@mui/material/Container';

import {LoginForm} from '@/components/auth/signIn/LoginForm';
import { SubmitHandler } from 'react-hook-form';
import { AlertInfo } from '@/components/ui/AlertInfo';

type FormValues = {
  email: string;
  password: string;
}

export default function SignIn() {

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: SubmitHandler<FormValues>) => {
    try {
      setLoading(true);   

      const res = await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/"
      });

      setLoading(false);

      if (!res?.error) {
        setFormValues({ email: "", password: "" });
      } 
      else {        
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <Container classes={{root: "container_custom"}}>
      <AlertInfo expand={!!error} content={error}/>
      <LoginForm 
        onSubmit={onSubmit} 
      />     
    </Container>
  )
}

