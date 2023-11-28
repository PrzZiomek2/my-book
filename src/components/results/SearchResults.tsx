"use client";
import React, { useEffect } from 'react'
import { ResultsList } from '@/components/commons/resultsList/ResultsList'
import { ActionType, useFetchReducer } from '@/utils/customHooks/useFetchReducer';
import { useSearchParams } from 'next/navigation'

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const [state, dispatch] = useFetchReducer();

  const getSearchUrl = (query: string) => ({
    title: `volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`,
    author: `volumes?q=inauthor:"${query}"&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=40`
  }); 

  const searchType = searchParams.get("searchType");
  const searchValue = searchParams.get("searchValue"); 
  
  useEffect(() => { 
  
    if(searchType && searchValue){
      dispatch({type: ActionType.FETCH_INIT})

      const getSearch = async () => { 
        const res = await fetch(`https://www.googleapis.com/books/v1/${getSearchUrl(searchValue)[searchType]}`)
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
    }
  }, [searchType, searchValue])

  return (
    <> 
        <ResultsList results={state.results?.items} resLoading={state.loading}/>
        {state.error && (
          <p>Nie znaleziono żadnych wyników. Sprawdź poprawność zapytania.</p>
        )}
    </>
  )
}


