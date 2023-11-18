import { UserPreferencesParsed } from "@/types/interfaces";

export const giveSuggestionsOnUserProfile = ({ 
   tags,
   read,
   favourite
}: UserPreferencesParsed) => `  
   na podstawie danych podaj listę 15 najbardziej trafnych tytułów książek. 
   lista jako tablica js stringów, zapisana w json, tablica jako words=[string1, string2, ...], string w formie "autor:tytuł" lub tylko autor lub tylko tytuł.
   tytuły na liście muszą się różnić od tych podanych.dane:książki przeczytane - ${read}.książki ulubione - ${favourite}.
   Zainteresowania - ${tags}
`;

export const giveKeywordsFromProfileDescription = (description: string) => `
   wyodrębnij z opisu słowa kluczowe,takie które nawiązują do autora: osobowości i/lub charakteru i/lub hobby.
   kluczowe pojęcia uprość do tzw. tagów, nie zmieniając znaczenia wynik podaj jako
   tablica słow js w json, jak words=[tag1, tag2, ...] max do 10 słów. opis:"${description}"
`;