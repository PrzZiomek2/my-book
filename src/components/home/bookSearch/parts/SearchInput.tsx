"use client";
import React, { FC } from 'react';
import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

interface SearchInputProps{
   setSelectedType: React.Dispatch<React.SetStateAction<string>>;
   selectedType: string;
   handleSearch: () => void;
   setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchInput:FC<SearchInputProps> = ({
   selectedType, 
   setSearchValue, 
   setSelectedType, 
   handleSearch
}) => {
  return (
   <FormControl sx={{
      width: "100%",
      flexDirection: "row",
      margin: "20px 0"
    }}>
      <InputLabel id="demo-simple-select-label">Tytuł / Autor</InputLabel>
      <Select
        label="Tytuł / Autor"
        labelId="select-label"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        sx={{width: "150px"}}
      >
        <MenuItem value="title">Tytuł</MenuItem>
        <MenuItem value="author">Autor</MenuItem>
      </Select>
      <TextField 
        sx={{flexGrow: 1}}
        label="Wyszukaj pozycję" 
        onChange={(event) => { 
          setSearchValue(event.target.value);
        }}
      />
      <Button
        onClick={handleSearch} 
        variant='outlined'
        sx={{
          height: "61px",
          padding: "5px 30px"
        }}
      >
        Szukaj
      </Button>
    </FormControl>
  )
}
