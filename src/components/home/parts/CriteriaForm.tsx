"use client";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Checkbox,
  Autocomplete,
  Button,
} from '@mui/material';
import { InputTags } from '@/components/commons/InputTags';

type FormData = {
  readBooks: string[];
  favouriteBooks: string[];
  tags: string[]   
  isCreative: boolean;
}

export const CriteriaForm = () => {
  const { control, handleSubmit } = useForm();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    
  };

  const [formData, setFormData] = useState<FormData>({
    readBooks: [],
    favouriteBooks: [],
    isCreative: false,
    tags: []   
 }); 

 const handleInputChange = (key: string, v: string[] | boolean) =>{
    setFormData(prev => ({
      ...prev,
      [key]: v
    }))
  }
 
  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        sx={{
          width: '100%',
          flexDirection: 'column',
          margin: '20px 0',
        }}
      >
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <label htmlFor='tags'>Tagi</label>
              <InputTags 
                id="tags"
                setTags={tags => handleInputChange("tags", tags)}
                tags={formData.tags}
              />
            </div>
          )}
        />
        <Controller
          name="readBooks"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <label htmlFor='readBooks'>Przeczytane książki</label>
              <InputTags 
                id="readBooks"
                setTags={read => handleInputChange("readBooks", read)}
                tags={formData.readBooks}
              />
            </div>
          )}
        />
        <Controller
          name="favouriteBooks"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <label htmlFor='favouriteBooks'>Ulubione książki</label>
              <InputTags 
                id="favouriteBooks"
                setTags={fav => handleInputChange("favouriteBooks", fav)}
                tags={formData.favouriteBooks}
              />
            </div>
          )}
        />
        <Controller
            name="includeSuggestions"
            control={control}
            defaultValue={false}
            render={({ field }) => (
            <div>
              <label htmlFor="isCreative">Kreatywnie</label>
              <Checkbox
                {...field}
                id='isCreative'
                color="primary"
                onChange={(e) =>  handleInputChange("isCreative", e.currentTarget.checked)}
              />
            </div>
            )}
        />  
        <Button 
          type="submit" 
          variant="outlined" 
          sx={{ marginTop: '20px' }}
        >
          GOTOWE
        </Button>
      </Box>
    </form>
  );
};


