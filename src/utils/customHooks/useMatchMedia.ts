import { useEffect, useState } from "react"

export const useMatchMedia = (mediaQuery: string) => {
   const [isQueryMatched, setIsQueryMatched] = useState(false);

   useEffect(() =>{
      const queryMatch = window.matchMedia(mediaQuery);

      setIsQueryMatched(queryMatch.matches);

      const updateMatch = (e: MediaQueryListEvent) => setIsQueryMatched(e.matches);

      queryMatch.addEventListener("change", updateMatch);

      return () => queryMatch.removeEventListener("change", updateMatch);
   },[mediaQuery]);

   return isQueryMatched;
}