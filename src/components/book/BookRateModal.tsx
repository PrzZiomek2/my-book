"use client"
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import TextField from '@mui/material/TextField';
import { ModalDialog } from '@/components/ui/ModalDialog';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { BookDefault, Opinion, OpinionRes } from '@/types/interfaces';
import { urls } from '@/utils/urls';

const {rootPath} = urls();
interface BookRateModalProps {
   setOpenRateModal: React.Dispatch<React.SetStateAction<boolean>>;
   openRateModal: boolean;
   authorId: string;
   authorName: string;
   bookId: string;
   book: BookDefault | null;
}

export const BookRateModal: React.FC<BookRateModalProps> = ({setOpenRateModal, openRateModal, authorId, authorName, bookId, book}) => {

   const { data, mutate } = useSWR<{opinions: OpinionRes[]}>(`${rootPath}/api/opinion/${bookId}`);
   const [validateMsg, setValidateMsg] = useState(false);

   const [opinion, setOpinion] = useState<Opinion>({
      author: { id: authorId, name: authorName },
      bookId,
      content: "",
      rate: 0
   });

   useEffect(() => {
      if(opinion.rate){
         setValidateMsg(false);
      }
   }, [opinion.rate])

   const saveRate = async () => {
      if(!opinion.rate){
         setValidateMsg(true);
         return;
      } 
      const opinionRes = await fetch(`${rootPath}/api/opinion/${bookId}`, {
         method: "POST",
         body: JSON.stringify({opinion})
       })
       .catch(err => console.log("err when adding opinion", err));

       const bookRes = await fetch(`${rootPath}/api/book/${book?.id}`, {
         method: "POST",
         body: JSON.stringify({
           ...book,
          read: book?.read || [],
          favourite: book?.favourite || []
         })
       }).catch(err => console.log("err when adding book", err));

      if(opinionRes?.ok && data) { 
         const opinionResJson = await opinionRes?.json();  
         if(opinionResJson?.success){ 
            mutate()  
         }
      };
      
      setOpenRateModal(false);
   };

   const iconStyles = {
      color: '#6169e1',
      width: "35px",
      height: "35px" 
   }

   return(
      <ModalDialog 
         title='Oceń pozycję'
         open={openRateModal}
         setOpen={setOpenRateModal}
         handleConfirm={saveRate}
      >
         <Typography>Oceń w skali od 1 do 5 klikając na gwiazdkę</Typography>
         <Box 
            sx={{ 
               margin: "10px auto",
               width: "175px"
            }}
         >
            {new Array(5).fill("x").map((_, i) => {
               const isMarked = i < opinion.rate;

               return (
                  <span key={i}>
                     { isMarked ? 
                     <StarIcon  className='icccccon'
                        sx={{cursor: "pointer"}} 
                        onClick={() => setOpinion(prev => ({...prev, rate: i + 1}))} 
                        style={iconStyles} 
                        
                     /> 
                     : 
                     <StarBorderOutlinedIcon 
                        sx={{cursor: "pointer"}} 
                        onClick={() => setOpinion(prev => ({...prev, rate: i + 1}))} 
                        style={iconStyles}
                     />
                     }
                  </span>
                 )
            })}
         </Box>
         {validateMsg  && 
            <Box 
               component="span"
               sx={{
                  color: "rgb(225, 45, 45)",
                  fontSize: "0.9rem"
               }}
            >
               Żeby ocena była zapisana należy dać ocenę
            </Box>
         }
         <Box>
            <Typography>Dodaj opinię, będzie ona widoczna pod daną pozycją w sekcji Opinie, inni użytkownicy będą mieć możliwość jej skomentowania</Typography>
            <TextField 
                multiline 
                minRows={3} 
                variant="outlined" 
                value={opinion?.content}
                onChange={(e) => setOpinion(prev => ({...prev, content: e.target.value}))}
                sx={{ 
                  marginTop: "20px",
                  width: "100%" 
               }}
            />
         </Box>
      </ModalDialog>
   )
}
