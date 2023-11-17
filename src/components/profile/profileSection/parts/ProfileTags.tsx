import React, { FC, useEffect, useState } from 'react';

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { InputTags } from '@/components/commons/inputTags/InputTags';
import { ProfileFormData } from '@/types/interfaces';
import { urls } from '@/utils/urls';
import { ActionType, useFetchReducer } from '@/utils/customHooks/useFetchReducer';
import { Loader } from '@/utils/loader';

const {rootPath} = urls();

interface ProfileTagsProps{
   setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
   tags: string[];
   description: string;
}

export const ProfileTags: FC<ProfileTagsProps> = ({setFormData, tags, description}) => {
   const [generatedState, dispatch] = useFetchReducer();
   const generatedTags = generatedState.results as string[];
   const currentTags = generatedTags.length ? generatedTags : tags;

   useEffect(() => {
      if(!currentTags.length) return;

      setFormData((prev) => ({
         ...prev,
         tags: currentTags
      }))

   },[currentTags])
   
   const handleGenerateTags = async () => {
      dispatch({type: ActionType.FETCH_INIT}); 

      const res = await fetch(`${rootPath}/api/profile/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      })
      .catch(() => {
         dispatch({
           type: ActionType.FETCH_ERROR,
           error: "Error when fetching keys from openai"
         })
       });
  
       const resJson = await res?.json();
       const resObj = JSON.parse(resJson.completion); 
       
       if(resJson){
         dispatch({
            type: ActionType.FETCH_SUCCESS,
            payload: Object.values(resObj?.words)
          })
       }; 
   };

  return (
   <Box sx={{ margin: "15px 0" }}>
      <Divider />
      <Box sx={{
         display: "flex",
         margin: "15px 0",
         gap: "20px",
         alignItems: "center"
      }}>
         <Button 
            variant="contained" 
            sx={{ 
               marginTop: '0',
               padding: "5px 20px" 
            }}
            onClick={handleGenerateTags}
        >
          START
        </Button>
        <Typography sx={{fontSize: "0.8rem"}}>
            Stwórz tagi na podstawie opisu z twojego profilu, używając AI.
        </Typography>
      </Box>
      <Divider sx={{marginBottom: "17px"}} />
      <Loader isLoading={generatedState.loading}>
         <InputTags
            id='tags'
            setTags={tags => setFormData((prev) => ({
               ...prev,
               tags
            }))}
            tags={currentTags}
         />
      </Loader>
   </Box>
  )
}
