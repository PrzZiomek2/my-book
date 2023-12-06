"use client";
import React, { FC, useContext } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { MediaViewportContext } from '@/context/MediaViewportProvider';
import { setUrlParams } from '@/utils/handlers';
import styles from './styles.module.css'

type FormValues = {
  searchValue: string;
  searchType: string;
}

export const SearchBook = () => {
  const router = useRouter();
  const {isWidescreenMax, isMobileMax} = useContext(MediaViewportContext); console.log(isWidescreenMax);
  const searchParams = useSearchParams(); 
  
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
    <form 
      className={styles.searchBookForm}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
        <Box
          sx={{
            display: "flex",
            width: '100%',
            flexDirection: 'row',
            margin: isWidescreenMax ? '20px auto' : '20px 0',
            paddingLeft: isWidescreenMax ? 0 : "10px",
            justifyContent: isWidescreenMax ? "center" : "flex-start"
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
                  width: '120px',
                  background: "aliceblue",
                  height: "50px"
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
                  background: "aliceblue",
                  width: isMobileMax ? "400px" : "500px",
                  maxWidth: "700px"
                }} 
                InputProps={{ 
                  sx: {
                    height: "50px"
                } }}
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
              height: '50px',
              padding: '5px 30px',
              background: "aliceblue"
            }}
          >
            Szukaj
          </Button>
        </Box>
  </form>
  )
}
