"use client";
import React, { useEffect, useState } from 'react';
import { ResultsList } from '@/components/home/bookSearch/parts/resultsList/ResultsList';
import { SearchInput } from './parts/SearchInput';

export const BookSearch = () =>{
   const [searchValue, setSearchValue] = React.useState("");
   const [results, setResults] = useState([]);
   const [selectedType, setSelectedType] = useState<string>("title");
   const [noResults, setNoResults] = useState(false);
   const [resultsLoading, setResultsLoading] = useState(false);
 
   const getSearchUrl = (query: string) => ({
     title: `volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`,
     author: `volumes?q=inauthor:"${query}"&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`
   }); 
 
  const handleSearch = () => {  
   if(!searchValue) return;
   setResultsLoading(true);
 
   const getSearch = async () => { 
     const res = await fetch(`https://www.googleapis.com/books/v1/${getSearchUrl(searchValue)[selectedType]}`)
       .catch(err => console.log("error when searching", err));
 
     const resJson = await res?.json(); 
 
     if(resJson?.items){
       setResultsLoading(false);
     }
 
     if(resJson?.totalItems === 0) {
       setNoResults(true);
       return;
     };
 
     setResults(resJson?.items);
     setNoResults(false);
    };
 
    getSearch(); 
  };

  return (
   <>
      <SearchInput 
         selectedType={selectedType}
         setSearchValue={setSearchValue}
         setSelectedType={setSelectedType}
         handleSearch={handleSearch}
      />
     <ResultsList results={results}/>
        {noResults && (
          <p>Nie znaleziono żadnych wyników. Sprawdź poprawność zapytania.</p>
        )}
   </>
  )
}
