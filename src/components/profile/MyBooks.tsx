"use client"
import React, { Suspense, useEffect, useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { CustomBook } from '@/types/interfaces';
import { Box } from '@mui/material';
import { ResultsList } from '@/components/home/bookSearch/parts/resultsList/ResultsList';

// TO DO: move logic down, make it ssr 

 export const MyBooks = () => {
   const [bookList, setBookList] = useState<{ favourite: CustomBook[], read: CustomBook[] }>({ favourite: [], read: [] }); 
   const {data: session} = useSession();
   const userId = session?.user.user._id;

   const { data } = useSWR<{books: CustomBook[]}>(`http://localhost:3000/api/user-books/${userId}`);

   const listUniq = (arr: {[key: string]: any}[], key: string) => [...new Map(arr.map(v => [v[key], v])).values()];

   useEffect(() => {
      const books = data?.books;
     if(books){     
         const favourites =  books.filter(book => book?.is_favourite);
         const read = books.filter(book => book?.is_read);

        setBookList({
         favourite: listUniq(favourites, "id"),
         read: listUniq(read, "id"),
        })
      }
   }, [data]); console.log("fav", bookList.favourite);
   
   
   return (
      <Box sx={{marginTop: "20px"}}>
         <Suspense fallback={<CircularProgress />}>
            <Tabs 
               ariaLabel='książki użytkownika'
               orientation='horizontal'
               items={[
               { 
                  panel: <ResultsList results={bookList.favourite} />, 
                  tab: { label: "Ulubione"} 
               },
               { 
                  panel: <ResultsList results={bookList.read} />,
                  tab: { label: "Przeczytane"} 
               },
               ]}
            />
         </Suspense>
      </Box>
   )
};
