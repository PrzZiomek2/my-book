"use client"
import React, { Suspense } from 'react'
import { useSession } from 'next-auth/react';
import Button from '@mui/material/Button';

import { OpinionRes } from '@/types/interfaces';
import RatingStars from '../../commons/RatingStarts';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';
import styles from './styles.module.css'

interface BookOpinionsProps{
   bookId: string;
}

export const BookOpinions: React.FC<BookOpinionsProps> = ({bookId}) => {
   const {data: session} = useSession();
   const { data: opinionData, isLoading } = useSWR<{opinions: OpinionRes[]}>(`http://localhost:3000/api/opinion/${bookId}`);

   const userId = session?.user.user._id;
   const opinionsFound = opinionData?.opinions && opinionData?.opinions.length > 0;
   const dates = (stamp: Date) => stamp ? new Date(stamp).toLocaleDateString("pl") + " " + new Date(stamp).toLocaleTimeString("pl") : "";

   return (
      <div>
         <h2 className={styles.details_opinions_header}>Opinie i komentarze</h2>
         <div className={styles.details_opinions_content}>
            <Suspense fallback={<CircularProgress />}>
               {opinionsFound && opinionData?.opinions.map(({_id, opinion, timestamp}) => (
                  <div key={_id?.toString()} className={styles.opinion}>
                     <div className={styles.opinion_metadata}>
                        <div className={styles.opinion_user}>
                           <div className={styles.opinion_user_avatar}>
                              <span></span>
                           </div>
                           <div className={styles.opinion_user_name}>{opinion?.author.name}</div>
                        </div>
                        <div className={styles.opinion_date_add}>{dates(timestamp as Date)}</div>
                        <div className={styles.opinion_rater}>
                           <RatingStars score={opinion?.rate}/>
                        </div>
                     </div>
                     <div className={styles.opinion_user_content}>{opinion.content}</div>
                     <div className={styles.opinion_actions}>
                        <Button 
                           onClick={() =>{}} 
                           variant='outlined'
                           className=''
                        >
                           Skomentuj
                        </Button>   
                        <Button 
                           onClick={() =>{}} 
                           variant='outlined'
                           className=''
                        >
                           Komentarze
                        </Button>   
                     </div>
                  </div>
               ))}
            </Suspense>

            {!opinionsFound && !isLoading ? <span>Brak opini</span> : null}
         </div>
      </div>
   )
}
