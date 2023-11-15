import { UserPreferencesParsed } from "@/types/interfaces";

export const suggestionsOnUserProfile = ({ 
   tags,
   read,
   favourite
}: UserPreferencesParsed) => `  
   na podstawie danych podaj listę 15 najbardziej trafnych tytułów książek. 
   lista jako tablica js stringów, zapisana w json, string w formie "autor:tytuł".tytuły na liście muszą się różnić od tych podanych.
   dane:książki przeczytane - ${read}.książki ulubione - ${favourite}.Zainteresowania - ${tags}
`