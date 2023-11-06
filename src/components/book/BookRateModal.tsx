"use client"
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ModalDialog } from '@/components/ui/ModalDialog';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { BookDefault, Opinion, OpinionRes } from '@/types/interfaces';
import useSWR from 'swr';
import { Box } from '@mui/material';

interface BookRateModalProps {
   setOpenRateModal: React.Dispatch<React.SetStateAction<boolean>>;
   openRateModal: boolean;
   authorId: string;
   authorName: string;
   bookId: string;
   book: BookDefault | null;
}

export const BookRateModal: React.FC<BookRateModalProps> = ({setOpenRateModal, openRateModal, authorId, authorName, bookId, book}) => {

   const { data, mutate } = useSWR<{opinions: OpinionRes[]}>(`http://localhost:3000/api/opinion/${bookId}`);
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
      const opinionRes = await fetch(`http://localhost:3000/api/opinion/${bookId}`, {
         method: "POST",
         body: JSON.stringify({opinion})
       })
       .catch(err => console.log("err when adding opinion", err));

       const bookRes = await fetch(`http://localhost:3000/api/book/${book.id}`, {
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

   return(
      <ModalDialog 
         title='Oceń pozycję'
         open={openRateModal}
         setOpen={setOpenRateModal}
         handleConfirm={saveRate}
      >
         <span>Oceń w skali od 1 do 5 klikając na gwiazdkę</span>
         <div>
            {new Array(5).fill("x").map((_, i) => {
               const isMarked = i < opinion.rate;

               return (
                  <span key={i}>
                     { isMarked ? 
                     <StarIcon sx={{cursor: "pointer"}} onClick={() => setOpinion(prev => ({...prev, rate: i + 1}))} style={{ color: '#6169e1' }} /> 
                     : 
                     <StarBorderOutlinedIcon sx={{cursor: "pointer"}} onClick={() => setOpinion(prev => ({...prev, rate: i + 1}))} style={{ color: '#6169e1' }}/>
                     }
                  </span>
                 )
            })}
         </div>
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
         <div>
            <span>Dodaj opinię, będzie ona widoczna pod daną pozycją w sekcji Opinie, inni użytkownicy będą mieć możliwość jej skomentowania</span>
            <TextField 
                multiline 
                minRows={3} 
                variant="outlined" 
                value={opinion?.content}
                onChange={(e) => setOpinion(prev => ({...prev, content: e.target.value}))}
            />
         </div>
      </ModalDialog>
   )
}
