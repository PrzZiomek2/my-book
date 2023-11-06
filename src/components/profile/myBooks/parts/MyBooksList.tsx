"use client"
import React, { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { CustomBook } from '@/types/interfaces';
import { ResultsList } from '@/components/home/bookSearch/parts/resultsList/ResultsList';

interface MyBooksListProps{
   flag: string;
}

export const  MyBooksList: FC<MyBooksListProps> = ({flag}) =>{
   const [bookList, setBookList] = useState<CustomBook[]>([]); 
   const {data: session} = useSession();
   const userId = session?.user.user._id;

   const { data, isLoading } = useSWR<{books: CustomBook[]}>(`http://localhost:3000/api/user-books/${userId}`);

//   const listUniq = (arr: {[key: string]: any}[], key: string) => [...new Map(arr.map(v => [v[key], v])).values()];

   useEffect(() => {
      const books = data?.books;
     if(books){     
         
         const read = books.filter(book => book?.[flag]);
         setBookList(read)
      }
   }, [data]); console.log("read", data);
   

  return (
   <ResultsList resLoading={isLoading} results={bookList} />
  )
}
