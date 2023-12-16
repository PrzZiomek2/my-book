import { CustomBook } from "@/types/interfaces";
import { ReadonlyURLSearchParams } from "next/navigation";

export const setUrlParams = (
  searchParams: ReadonlyURLSearchParams, 
  params: {[key: string]: string}
): string => {
  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
  Object.entries(params).forEach( ([key, value]) => {
   currentParams.set(key, value);
  });
  
  return currentParams.toString();
};

export const getBooksInfo = (book: CustomBook[], key: keyof CustomBook): string => book 
  .filter(book => book[key])
  .map(book => `${book.volumeInfo.authors[0]}:${book.volumeInfo.title}`)
  .slice(0, 15)
  .join(",");

export const getApiData = async <T>(url: string): Promise<T> => {
  const res = await fetch(url).catch(err => console.log(err));
  const resJson = await res?.json(); 
  
  return resJson;
};  

export const generateRandomString = (length = 12) => Math.random()
  .toString(20)
  .substring(2, length);
