"use client";
import React, { FC } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  searchQuery: string;
  searchType: string;
}

export const BookSearch = () => {
  const router = useRouter();

  const schema = yup.object().shape({
    searchQuery: yup.string().required('Pole wyszukiwarki nie może byc puste'),
    searchType: yup.string()
        .required()
        .oneOf(["title", "author"])
  });

  const { control, handleSubmit, formState, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: FormValues, e) => {
    e.preventDefault();
    // router.push({});
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
    <Box
      sx={{
        width: '100%',
        flexDirection: 'row',
        margin: '20px 0',
      }}
    >
      <InputLabel>Tytuł / Autor</InputLabel>
      <Controller
        name="searchType"
        control={control}
        defaultValue="title" 
        render={({ field }) => (
          <Select
            label="Tytuł / Autor"
            labelId="select-label"
            {...field}
            sx={{ width: '150px' }}
          >
            <MenuItem value="title">Tytuł</MenuItem>
            <MenuItem value="author">Autor</MenuItem>
          </Select>
        )}
      />
      <Controller
        name="searchQuery"
        control={control}
        render={({ field }) => (
          <TextField sx={{ flexGrow: 1 }} label="Wyszukaj pozycję" {...field} />
        )}
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{
          height: '61px',
          padding: '5px 30px',
        }}
      >
        Szukaj
      </Button>
    </Box>
  </form>
  )
}
