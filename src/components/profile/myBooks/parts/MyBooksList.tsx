import React, { FC, Suspense, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { CustomBook } from '@/types/interfaces';
import { ResultsList } from '@/components/commons/resultsList/ResultsList';
import CircularProgress from '@mui/material/CircularProgress';
import { urls } from '@/utils/urls';

const {rootPath} = urls();

interface MyBooksListProps{
   flag: string;
}

export const  MyBooksList: FC<MyBooksListProps> = ({flag}) =>{
   const {data: session} = useSession();
   const userId = session?.user.user._id;
   
   const { data } = useSWR<{books: CustomBook[]}>(`${rootPath}/api/user-books/${userId}`);
   const books = data?.books?.filter(book => book?.[flag]); 
   
  return (
   <Suspense fallback={<CircularProgress />}>
      <ResultsList 
            results={books} 
            noDescription
         />
   </Suspense>
  )
}

