"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

interface ContactFormData {
  name: string;
  email: string;
  content: string;
}

export const ContactForm: React.FC = () => {
  const { control, handleSubmit } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container gap="40px">
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Imię"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Wiadomość"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Wyślij
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
