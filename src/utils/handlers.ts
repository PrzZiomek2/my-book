import { ReadonlyURLSearchParams } from "next/navigation";

export const setUrlParams = (searchParams: ReadonlyURLSearchParams, params: {[key: string]: string}) => {
  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
  Object.entries(params).forEach( ([key, value]) => {
   currentParams.set(key, value);
  });
  
  return currentParams.toString();
}