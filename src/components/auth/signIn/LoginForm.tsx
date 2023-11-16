import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

type FormValues = {
  email: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: (data: SubmitHandler<FormValues>) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) =>{

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('pole email nie może być puste'),
    password: yup.string().required('Polr hasło nie może byc puste'),
  });

  const { control, handleSubmit, formState, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Box sx={{maxWidth: "600px"}}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Login"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                type="email"
                id="email"
                placeholder="twoj.email@pl"
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                label="Hasło"
                helperText={fieldState.error?.message}
                type="password"
                id="password"
                placeholder="hasło"
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
          Zaloguj się
        </Button>
        <Box mt={4} className="login-others">
          <Typography>
            <Link 
              underline="hover" 
              sx={{
                fontSize: "0.875rem",
                color: "rgb(97, 97, 200)"
              }
            }>
              <GoogleIcon sx={{ fontSize: "1.2rem" }} /> Zaloguj się przez Google
            </Link>
          </Typography>
          <Typography>
            <Link 
              underline="hover" 
              sx={{
                fontSize: "0.875rem",
                color: "rgb(97, 97, 200)"
              }
            }>
              <FacebookIcon sx={{ fontSize: "1.2rem" }} /> Zaloguj się przez Facebooka
            </Link>
          </Typography>
        </Box>
        <Typography variant="body2" className="small fw-bold mt-2 pt-2 mb-0">
          Nie masz jeszcze konta? <Link href="/register" className="link-danger">Zarejestruj się</Link>
        </Typography>
      </form>
    </Box>
 
  );
}


