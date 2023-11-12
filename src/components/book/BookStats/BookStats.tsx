import React from 'react'
import { Opinion, OpinionRes } from '@/types/interfaces';
import RatingStars from '../../commons/RatingStarts';
import useSWR from 'swr';
import { urls } from '@/utils/urls';
import styles from './styles.module.css'

const {rootPath} = urls();

interface BookStatsProps{
   className?: string;
   favouriteN: number;
   toReadN: number;
   bookId: string;
}

export const BookStats: React.FC<BookStatsProps> = ({className, favouriteN, toReadN, bookId }) => {

   const { data: opinionData } = useSWR<{opinions: OpinionRes[]}>(`${rootPath}/api/opinion/${bookId}`);

   const rateSum = opinionData && opinionData.opinions
      .map(({opinion}) => opinion.rate)
      .reduce((a, b) => a + b, 0 );
   const avgRate = rateSum && opinionData ? rateSum / opinionData.opinions.length : 0;
   
  return (
    <div className={className}>
       <div className={styles.details_sub_stats}>
         <h4>Ocena</h4>
         <RatingStars score={avgRate}/>
      </div>
      <div className={styles.details_sub_stats}>
         <h4>Opinie</h4>
         <div>{opinionData?.opinions.length || 0}</div>
      </div>
      <div className={styles.details_sub_stats}>
         <h4>Ulubione </h4>
         <div>{favouriteN}</div>
      </div>
      <div className={styles.details_sub_stats}>
         <h4>Do przeczytania </h4>  
         <div>{toReadN}</div>
      </div>
    </div>
  )
}


