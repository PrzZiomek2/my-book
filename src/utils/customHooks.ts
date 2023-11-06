import {useEffect, useState} from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils/handlers';

export const useSWRHook = <T,>(url: string) => {

   const { data, isLoading } = useSWR<T>(url, fetcher);
   const [res, setRes] = useState<T>();

   useEffect(() => {
     if(data){
         setRes(data);
      }
   }, [data]); 

   return { data: res, isLoading }
}