import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { BookDefault, BookType, CustomBook } from '@/types/interfaces';
import { Loader } from '@/utils/loader';  
import useSWR from 'swr';


type BookTypeArg = BookType.FAVOURITE | BookType.ON_SHELF | BookType.READ;

interface BookActionsProps{
   className?: string;
   userId: string;
   book: CustomBook & BookDefault;
}

export const BookActions: React.FC<BookActionsProps> = ({className, book, userId}) => {
   const {data: customBook, mutate} = useSWR<{book: CustomBook}>(`http://localhost:3000/api/book/${book.id}`);

   const currentBook = customBook?.book || book; 
  
   const [isLoading, setIsLoading] = useState<{read?: false, favourite?: false}>({read: false, favourite: false});

   const isRead =  currentBook.read && typeof currentBook.read ==="object" && currentBook.read.find(id => id === userId);
   const isfavourite = currentBook.favourite && typeof currentBook.favourite ==="object" && currentBook.favourite?.find(id => id === userId);

   const handleAddBook = async (book: BookDefault, type: BookTypeArg) => {  
      if(!userId) return; console.log({book});
      
      setIsLoading(prev => ({[type]: true}));
      const secondType = type === BookType.FAVOURITE ? BookType.READ : BookType.FAVOURITE;

      const res = await fetch(`http://localhost:3000/api/user-books/${userId}`, {
        method: "POST",
        body: JSON.stringify({
          book: { ...book, [`is_${type}`]: true }
        })
      }).catch(err => console.log("err when adding book", err));
  
      if(res?.ok){
         const resJson = await res?.json(); 
         if(resJson?.success){
            console.log(resJson.message);        
         }
      }; 
      
      const existingType = book?.[type] || []; console.log({existingType, cbook: {...book,[type]: existingType.find(id => id === userId) ? existingType.filter(id => id !== userId) : [...existingType, userId]}});
      
      const bookRes = await fetch(`http://localhost:3000/api/book/${book.id}`, { 
         method: "POST", 
         body: JSON.stringify({
           ...book,
          [type]: existingType.find(id => id === userId) ? existingType.filter(id => id !== userId) : [...existingType, userId]
         })
       }).catch(err => console.log("err when adding book", err)); 
       console.log({bookRes});
       
       setIsLoading(prev => ({[type]: false}));
       console.log({bookRes});
      if(bookRes?.ok) {
         const bookResJson = await bookRes?.json(); 
         if(bookResJson?.success){
            mutate();
            console.log(bookResJson.message);        
         }
      }   
   };

   return(
      <div className={className}>
         <Button onClick={() => handleAddBook(currentBook, BookType.ON_SHELF)} size="small">Na półkę</Button>
         <Button onClick={() => handleAddBook(currentBook, BookType.READ)} size="small">
            <Loader isLoading={isLoading.read!}>
               <span>{isRead ? "Przeczytane" : "Do przeczytanych"}</span>
            </Loader>
         </Button>
         <IconButton 
            className='favourite_button'
            onClick={() => handleAddBook(currentBook, BookType.FAVOURITE)} 
            aria-label="add to favorites"
         >
            <Loader isLoading={isLoading.favourite!}>
               <span>{isfavourite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</span>
            </Loader>
         </IconButton>
      </div>
   )
}