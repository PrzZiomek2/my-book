import React from 'react'

import { RankingBook } from '@/types/interfaces';
import { getApiData } from '@/utils/handlers';
import { urls } from '@/utils/urls';

import Box from '@mui/material/Box';
import { RankedBook } from '@/components/ranking/RankedBook';

const {rootPath} = urls();  

export default async function Ranking() {
  const { books } = await getApiData<{books: RankingBook[]}>(`${rootPath}/api/ranking`); 
  const booksSorted = books.sort((a,b) => Number(a.rate) + Number(b.rate));
   
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      marginTop: "50px"
    }}>
      {booksSorted?.map(book => <RankedBook id={book.id} book={book} />)}
    </Box>
  )
}
