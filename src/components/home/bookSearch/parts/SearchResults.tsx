"use client";
import React, { useEffect, useState } from 'react'
import { ResultsList } from '@/components/commons/resultsList/ResultsList'
import { ActionType, useFetchReducer } from '@/utils/customHooks/useFetchReducer';
import { useSearchParams } from 'next/navigation'

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState<string>("title");
  const [state, dispatch] = useFetchReducer();

  const getSearchUrl = (query: string) => ({
    title: `volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`,
    author: `volumes?q=inauthor:"${query}"&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`
  }); 

  useEffect(() => {
    console.log({quer: searchParams});
    
  }, [searchParams])

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
    <div>
        <ResultsList results={state.results?.items} resLoading={state.loading}/>
        {state.error && (
          <p>Nie znaleziono żadnych wyników. Sprawdź poprawność zapytania.</p>
        )}
    </div>
  )
}


