import React, { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { CustomBook } from '@/types/interfaces';
import { ResultsList } from '@/components/commons/resultsList/ResultsList';
import { urls } from '@/utils/urls';

const {rootPath} = urls();

interface MyBooksListProps{
   flag: string;
}

export const  MyBooksList: FC<MyBooksListProps> = ({flag}) =>{
   const [bookList, setBookList] = useState<CustomBook[]>([]); 
   const {data: session} = useSession();
   const userId = session?.user.user._id;
   
   const { data, isLoading } = useSWR<{books: CustomBook[]}>(`${rootPath}/api/user-books/${userId}`);

   useEffect(() => {
      const books = data?.books;
     if(books){     
         
         const read = books.filter(book => book?.[flag]);
         setBookList(read)
      }
   }, [data]); console.log("read", data);
   

  return (
   <ResultsList 
      resLoading={isLoading} 
      results={bookList} 
      noDescription
   />
  )
}

