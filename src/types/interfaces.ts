import { Types } from 'mongoose';

export interface BookDefault {
   id: string;
   kind: string;
   searchInfo: { textSnippet: string; };
   volumeInfo: {
      authors: string[];
      infoLink: string;
      publishedDate: string;
      subtitle: string;
      title: string;
      language: string;
      categories: string[];
      description: string;
      imageLinks: {
         smallThumbnail: string;
         thumbnail: string;
         small: string;
         medium: string;
         large: string;
      };
      previewLink: string;
      canonicalVolumeLink: string;
   }
}

export interface BookDetailed {
   saleInfo: {
     listPrice: {
       amount: number;
       currencyCode: string
     };
     retailPrice: {
       amount: number;
       currencyCode: string
     };
     saleability: string;
   };
   volumeInfo: {
     imageLinks: {
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
   }
     title: string;
     description: string;
     canonicalVolumeLink: string;
     infoLink: string;
     previewLink: string;
     subtitle: string;
     authors: string[];
     categories: string[];
   };
   selfLink: string;
 }

export interface Comment {
   id: string;
   author: { name: string; id: string; }
   content: string
}

export interface CustomBook extends BookDefault {
   _id?: Types.ObjectId;
   read: string[];
   onShelf: string[];
   favourite: string[]; 
   rate: number;
   comments: Comment[];
   is_favourite: boolean;
   is_read: boolean;
}

export interface RankingBook{
   id: string;
   title: string;
   authors: string;
   rate: string;
   opinions: number;
   subtitle: string;
   infoLink: string;
   categories: string[];
   imageLink: string;
   read: string[];
   favourite: string[]; 
}

export interface UserBooks {
   userId: string;
   books: CustomBook[];
}

export interface Opinion {
   author: {id: string, name: string};
   content: string;
   bookId: string;
   rate: number;
   replies?: [{ authorId: string; content: string; }];
}

export interface OpinionRes{
   _id?: Types.ObjectId;
   opinion: Opinion;
   timestamp?: Date; 
}  

export interface Profile{
   _id: string;
   name: string;
   description: string;
   id: string;
   image: string;
   tags: string[]
}

export interface UserPreferences{
   tags: string[];
   read: string[];
   favourite: string[];
}

export interface UserPreferencesParsed{
   tags: string;
   read: string;
   favourite: string;
   isCreative?: boolean
   temperature?: number;
}

export interface ProfileFormData {
   name: string;
   description: string;
   image: string;
   tags: string[]   
}

export type CriteriaFormData = {
   readBooks: string[];
   favouriteBooks: string[];
   tags: string[]   
   isCreative: boolean;
 }