"use client";
import React, { FC } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setUrlParams } from '@/utils/handlers';

type FormValues = {
  searchValue: string;
  searchType: string;
}

export const SearchBook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); console.log({pathname}); 

  const schema = yup.object().shape({
    searchValue: yup.string().required('Pole wyszukiwarki nie może byc puste'),
    searchType: yup.string()
        .required()
        .oneOf(["title", "author"])
  });

  const { control, handleSubmit, formState, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: FormValues, e) => {
    e.preventDefault();

    const urlWithParams = setUrlParams(searchParams, {
      searchType: data.searchType,
      searchValue: data.searchValue,
    }); 
    
    router.push(`/results?${urlWithParams}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box
          sx={{
            display: "flex",
            width: '100%',
            flexDirection: 'row',
            margin: '20px 0',
          }}
        >
          <Controller
            name="searchType"
            control={control}
            defaultValue="title" 
            render={({ field }) => (
              <Select
                {...field}
                sx={{ 
                  width: '150px',
                  background: "white" 
                }}
              >
                <MenuItem value="title">Tytuł</MenuItem>
                <MenuItem value="author">Autor</MenuItem>
              </Select>
            )}
          />
          <Controller
            name="searchValue"
            control={control}
            render={({ field }) => (
              <TextField 
                sx={{ 
                  flexGrow: 1, 
                  background: "white",
                  width: "500px",
                }} 
                placeholder="Wyszukaj dowolną pozycję" 
                {...field} 
              />
            )}
          />
          <Button
            type="submit"
            variant="outlined"  
            color='secondary'      
            sx={{
              height: '61px',
              padding: '5px 30px',
              background: "white"
            }}
          >
            Szukaj
          </Button>
        </Box>
  </form>
  )
}
