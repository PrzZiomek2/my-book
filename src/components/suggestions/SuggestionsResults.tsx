"use client"
import React, { FC, useEffect, useMemo, useState } from 'react';

import { urls } from '@/utils/urls';
import { UserPreferencesParsed } from '@/types/interfaces';
import { ResultsList } from '../commons/resultsList/ResultsList';
import { ActionType, useFetchReducer } from '@/utils/customHooks/useFetchReducer';

const {rootPath} = urls();
interface SuggestionsResultsProps{
  tags: string;
  read: string;
  favourite: string;
  temperature: number;
} 

export const SuggestionsResults: FC<SuggestionsResultsProps> = ({
  tags, 
  read, 
  favourite, 
  temperature
}) => {
  const [suggestionNames, setSuggestionNames ] = useState<string[]>([]);
  const [booksState, dispatch] = useFetchReducer();

  const profileMemoized = useMemo(() => ({
    favourite,
    read, 
    tags,
    temperature
  }), [favourite, read, tags, temperature]);

  useEffect(() => {
    dispatch({type: ActionType.FETCH_INIT}); 

    const fetchUserSuggestions = async (data: UserPreferencesParsed ) => {
      const res = await fetch(`${rootPath}/api/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .catch(() => {
        dispatch({
          type: ActionType.FETCH_ERROR,
          error: "Error when fetching suggestions from openai"
        })
      });
    
      const resJson = await res?.json(); 
      const resObj = JSON.parse(resJson.completion); 
      
      if(resJson){
        setSuggestionNames(Object.values(resObj?.words));
      }; 
    }; 
    
    fetchUserSuggestions(profileMemoized);

  }, [profileMemoized]); 
  
  
  useEffect(() => { 
    if(!suggestionNames.length && !Array.isArray(suggestionNames)) return;

    const queries = suggestionNames && suggestionNames?.map(pair => {
      const [author, title] = pair?.split(':');
      return `${title}+inauthor:${author}`;
    });

    const getBooks = async () => {
      const requests = queries.map(
        query => fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API}&maxResults=1`)
      );
      const requestsJson = requests.map(req => req.then(res => res.json()));
      const books = await Promise.all(requestsJson)
        .catch(() => {
          dispatch({
            type: ActionType.FETCH_ERROR,
            error: "Error when fetching books"
          })
        });

      if(books){  
        const items = books.map(({items, totalItems}) => totalItems ? items?.[0] : {});
        dispatch({
          type: ActionType.FETCH_SUCCESS,
          payload: items
        })
      }
    };

      getBooks();
  }, [suggestionNames]);  
  
  
  return (
    <ResultsList results={booksState.results} resLoading={booksState.loading}/>
  )
};

