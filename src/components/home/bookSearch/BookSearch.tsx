"use client";
import React, { useEffect, useState } from 'react';
import { ResultsList } from '@/components/home/bookSearch/parts/resultsList/ResultsList';
import { SearchInput } from './parts/SearchInput';
import { ActionType, useFetchReducer } from '@/utils/customHooks/useFetchReducer';

export const BookSearch = () =>{
   const [searchValue, setSearchValue] = React.useState("");
   const [selectedType, setSelectedType] = useState<string>("title");
   const [state, dispatch] = useFetchReducer();

   const getSearchUrl = (query: string) => ({
     title: `volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`,
     author: `volumes?q=inauthor:"${query}"&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`
   }); 
 
  const handleSearch = () => {  
   if(!searchValue) return;
   dispatch({type: ActionType.FETCH_INIT})

   const getSearch = async () => { 
     const res = await fetch(`https://www.googleapis.com/books/v1/${getSearchUrl(searchValue)[selectedType]}`)
       .catch(err => {
          dispatch({
            type: ActionType.FETCH_ERROR,
            error: `Błąd podczas odpytywqania api`
          });
          console.log(err);      
       });
 
     const resJson = await res?.json(); 

     if(resJson?.items){
      dispatch({
        type: ActionType.FETCH_SUCCESS,
        payload: { items: resJson?.items }
      })
    }
 
     if(resJson?.totalItems === 0) {
        dispatch({
          type: ActionType.FETCH_ERROR,
          error: "Brak wyników, spróbuj zmienić kryteria wyszukiwania"
        })
     };
 
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
     <ResultsList results={state.results?.items} resLoading={state.loading}/>
        {false && (
          <p>Nie znaleziono żadnych wyników. Sprawdź poprawność zapytania.</p>
        )}
   </>
  )
}










/*
export const BookSearch = () =>{
   const [searchValue, setSearchValue] = React.useState("");
   const [results, setResults] = useState([]);
   const [selectedType, setSelectedType] = useState<string>("title");
   const [resultsLoading, setResultsLoading] = useState(false);

   const getSearchUrl = (query: string) => ({
     title: `volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`,
     author: `volumes?q=inauthor:"${query}"&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`
   }); 
 
  const handleSearch = () => {  
   if(!searchValue) return;
   setResults([]);
   setResultsLoading(true);

   const getSearch = async () => { 
     const res = await fetch(`https://www.googleapis.com/books/v1/${getSearchUrl(searchValue)[selectedType]}`)
       .catch(err => console.log("error when searching", err));
 
     const resJson = await res?.json(); 

     if(resJson?.items){
      setResultsLoading(false);
    }
 
     if(resJson?.totalItems === 0) {
       return;
     };
 
     setResults(resJson?.items);
    };
 
    getSearch(); 
  };
console.log({resinsearch: results});

  return (
   <>
      <SearchInput 
         selectedType={selectedType}
         setSearchValue={setSearchValue}
         setSelectedType={setSelectedType}
         handleSearch={handleSearch}
      />
     <ResultsList results={results} resLoading={resultsLoading}/>
        {false && (
          <p>Nie znaleziono żadnych wyników. Sprawdź poprawność zapytania.</p>
        )}
   </>
  )
}

*/