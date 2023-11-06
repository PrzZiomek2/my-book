import React from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import truncate from 'lodash.truncate'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BookDefault } from '@/types/interfaces';

import { ItemsList, ListItem } from '@/components/ui/ItemsList';
import { BookActions } from '@/components/commons/BookActions';
import styles from './styles.module.css';

interface ResultsListProps{
   results: BookDefault[];
   resLoading?: boolean;
}

export const ResultsList: React.FC<ResultsListProps> = ({results, resLoading}) => {
   const {data: session} = useSession();
   const userId = session?.user.user._id; console.log({results});

   return (
         <ItemsList>
            {results.length > 0 && results?.map(({id, volumeInfo, ...restInfo}) => { 
            
                  const coverImage = volumeInfo.imageLinks?.thumbnail;
                  const descrFragment = truncate(volumeInfo.description, {
                     length: 200,
                     separator: /,? +/,
                  });
                  const titleFragment = truncate(volumeInfo.title, {
                     length: 50,
                     separator: /,? +/,
                  });
                  const book = {
                     id, 
                     volumeInfo,
                     ...restInfo
                  };
                  
                  return(
                     <ListItem
                        key={id} 
                        noDivider
                        className={styles.book_list_item}
                     >
                        <Card 
                           sx={{ 
                              display: "flex",
                              padding: "20px",
                              border: "1px solid blueviolet",
                              gap: "20px",
                              width: "100%",
                              justifyContent: "space-between"
                           }}
                        >
                           {coverImage ?
                              <Image
                                 src={coverImage}  
                                 width={140}
                                 className={styles.book_list_item_img}
                                 height={200}
                                 alt='okładka'
                              /> :
                              <div className={styles.cover_replace}>Podgląd niedostępny</div>}
                           <CardContent>
                              <Typography 
                                 gutterBottom variant="h5" 
                                 component="div"
                                 sx={{ 
                                    display: "flex",
                                    flexDirection: "column",
                                    fontSize: "1.2rem"
                                 }}
                              >
                                 <Link className={styles.book_title_link} href={`/book/${id}`}>{titleFragment}</Link>
                                 <span className={styles.book_authors}>{volumeInfo.authors?.slice(0, 2).join(",")}</span>
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                 <p>{volumeInfo.subtitle}</p>
                                 <p>{descrFragment}</p>
                              </Typography>
                           </CardContent>
                           <CardActions sx={{flexDirection: "column"}}>
                           {book && userId &&
                              <BookActions
                                 className={styles.search_list_actions}
                                 book={book}
                                 userId={userId}
                              />}
                           </CardActions>
                     </Card>
               </ListItem>
               )}
            )}
         </ItemsList>
   )
   
}

