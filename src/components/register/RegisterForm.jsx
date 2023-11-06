import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FormControl,
  Button,
  TextField,
  Box
} from '@mui/material';

export const RegisterForm = ({ createAccount }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Imię jest wymagane'),
    email: yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
    password: yup.string().required('Hasło jest wymagane'),
  });

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data, e) => {
      e.preventDefault();
      createAccount(data);
  };

  return (
   <Box sx={{maxWidth: "600px"}}>
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl fullWidth margin="normal">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Imię"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Email"
              type="email"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Hasło"
              type="password"
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="login-submit--btn"
        disabled={formState.isSubmitting}
      >
        Zapisz
      </Button>
    </form>
    </Box>
  );
}


