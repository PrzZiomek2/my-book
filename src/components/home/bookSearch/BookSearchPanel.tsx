import React from 'react';

import { BookSearch } from './parts/BookSearch';
import { Box } from '@mui/material';
import { SearchResults } from './parts/SearchResults';

export const BookSearchPanel = () =>(
   <Box>
      <BookSearch />
      <SearchResults />
   </Box>
);


