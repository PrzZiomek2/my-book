"use client";
import React from "react";

import { signIn } from "next-auth/react";
import Container from "@mui/material/Container";

import { LoginForm } from "@/components/auth/signIn/LoginForm";
import { AlertInfo } from "@/components/ui/AlertInfo";
import {
  ActionType,
  useFetchReducer,
} from "@/utils/customHooks/useFetchReducer";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const [state, dispatch] = useFetchReducer();

  const onSubmit = async (data: FormValues) => {
    try {
      dispatch({ type: ActionType.FETCH_INIT });

      const res = await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/profile",
      });

      if (res) {
        router.push("/auth/signin");
      }
      dispatch({
        type: ActionType.FETCH_SUCCESS,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: ActionType.FETCH_ERROR,
        error: `Niepoprawny login lub hasło`,
      });
    }
  };

  return (
    <Container>
      <AlertInfo expand={!!state.error} content={state.error} />
      <h2 className={styles.header}>Logowanie</h2>
      <LoginForm onSubmit={onSubmit} />
    </Container>
  );
}
