import React, { Suspense, useState } from 'react';
import { useSession } from 'next-auth/react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { BookDefault, BookType, CustomBook } from '@/types/interfaces';
import { Loader } from '@/utils/loader';  
import useSWR from 'swr';

// TO DO: refactor, separate on two different 


type BookTypeArg = BookType.FAVOURITE | BookType.ON_SHELF | BookType.READ;

interface BookActionsProps{
   className?: string;
   book: CustomBook & BookDefault;
}

export const BookActions: React.FC<BookActionsProps> = ({className, book}) => {
   const {data: session} = useSession();
   const userId = session?.user.user._id; 
   const {data: customBook, mutate} = useSWR<{book: CustomBook}>(`http://localhost:3000/api/book/${book.id}`);

   const currentBook = customBook?.book || book; 
  
   const [isLoading, setIsLoading] = useState<{read?: false, favourite?: false}>({read: false, favourite: false});

   const isRead =  currentBook.read && currentBook.read.find(id => id === userId);
   const isfavourite = currentBook.favourite && currentBook.favourite?.find(id => id === userId);

   const handleAddBook = async (type: BookTypeArg) => {  
      if(!userId) return; 
      
      setIsLoading(prev => ({[type]: true}));

      const res = await fetch(`http://localhost:3000/api/user-books/${userId}`, {
        method: "POST",
        body: JSON.stringify({
          book: { ...currentBook, [`is_${type}`]: true }
        })
      }).catch(err => console.log("err when adding book", err));
  
      if(res?.ok){
         const resJson = await res?.json(); 
         if(resJson?.success){
            console.log(resJson.message);        
         }
      }; 
      
      const existingType = currentBook?.[type] || [];
      
      const bookRes = await fetch(`http://localhost:3000/api/book/${currentBook.id}`, { 
         method: "POST", 
         body: JSON.stringify({
           ...currentBook,
          [type]: existingType.find(id => id === userId) ? existingType.filter(id => id !== userId) : [...existingType, userId]
         })
       }).catch(err => console.log("err when adding book", err)); 
       console.log({bookRes});
       
       setIsLoading(prev => ({[type]: false}));
 
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
         <Button onClick={() => handleAddBook(BookType.READ)} size="small">
            <Loader isLoading={isLoading.read!}>
               <span>{isRead ? "Przeczytane" : "Do przeczytanych"}</span>
            </Loader>
         </Button>
         <IconButton 
            className='favourite_button'
            onClick={() => handleAddBook(BookType.FAVOURITE)} 
            aria-label="add to favorites"
         >
            <Loader isLoading={isLoading.favourite!}>
               <span>{isfavourite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</span>
            </Loader>
         </IconButton>
      </div>
   )
}