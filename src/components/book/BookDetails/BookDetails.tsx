"use client"
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import striptags from 'striptags'
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import LaunchIcon from '@mui/icons-material/Launch';
import { CustomBook } from '@/types/interfaces';
import { BookActions } from '@/components/commons/BookActions';
import { BookRateModal } from '@/components/book/BookRateModal';
import { BookStats } from '@/components/book/BookStats/BookStats';
import styles from './styles.module.css'
import { ExternalLink } from '@/components/ui/ExternalLink';

interface BookDetailsProps{
   currentBook: CustomBook;
}

export const BookDetails: FC<BookDetailsProps> = ({currentBook}) => {
   const [openRateModal, setOpenRateModal] = useState(false);
   const {data: session} = useSession();

   const userId = session?.user.user._id;
   const authorName = session?.user.user.name; 
   const volumeInfo = currentBook?.volumeInfo;
   const images = volumeInfo?.imageLinks;
   const imageSrc = images?.large || images?.medium || images?.small || images?.thumbnail;
   const priceInfo = currentBook?.saleInfo;
   const notForSale = priceInfo?.saleability === "NOT_FOR_SALE";
   const priceRange = notForSale ? "" : `${priceInfo?.listPrice?.amount || ""} - ${priceInfo?.retailPrice?.amount || ""}${priceInfo?.listPrice?.currencyCode || ""}`;
   
  return (
    <div>
      <div className={styles.details_info_left}>
         <div className={styles.details_image}>
            {imageSrc ? 
            <Image
               src={imageSrc} 
               alt='book image'
               width={290}
               height={400}
            /> :
            <div className={styles.details_image_replacement}></div>
            }
         </div>
         <div className={styles.details_info_stats}>
            <BookStats 
               favouriteN={currentBook?.favourite?.length} 
               toReadN={currentBook?.read?.length}
               bookId={currentBook?.id}
            />
            <div className={styles.details_info_stats_actions}>
               <Button
                  onClick={() => setOpenRateModal(true)} 
                  className='opinion-button'
                  variant='contained'
               >
                  Dodaj opinię
               </Button>
               {currentBook && userId &&
               <BookActions 
                  className={styles.book_actions_details}
                  book={currentBook}
                  userId={userId}
               />}
            </div>
         </div> 
      </div>
      <div className={styles.details_info_bottom}>
      <div className={styles.details_sub_info}>
         <h3>{volumeInfo?.subtitle}</h3>
         <div className={styles.details_sub_metadane}>
            <h4>Autor / Autorzy</h4>
            <span>{volumeInfo?.authors?.join(",")}</span>
         </div>
         <div className={styles.details_sub_metadane}>
            <h4>Opis</h4>
            <span>{striptags(volumeInfo?.description || "")}</span>
         </div>
         <div className={styles.details_sub_metadane}>
            <h4>Kategorie</h4>
            <span>{volumeInfo?.categories?.join(",")}</span>
         </div>
         <div className={styles.details_sub_metadane}>
            <h4>Linki</h4>
            <div className={styles.details_sub_links}>
               <ExternalLink url={volumeInfo?.canonicalVolumeLink}>Google play</ExternalLink>
               <ExternalLink url={volumeInfo?.infoLink}>Informacje</ExternalLink>
               <ExternalLink url={volumeInfo?.previewLink}>Podgląd</ExternalLink>
            </div>
         </div>
      </div>

      <div className={styles.details_sub_price}>
         <h4>Cena</h4>
         <span>{priceRange}</span>
      </div>

      <div className={styles.details_sub_similar}>
         <h4>Podobne</h4>
         <div></div>
      </div>
      </div>      
      {currentBook?.id && userId && openRateModal ?
         <BookRateModal
            openRateModal={openRateModal} 
            setOpenRateModal={setOpenRateModal}
            authorId={userId}
            authorName={authorName}
            bookId={currentBook.id}
            book={currentBook}
         /> : null}
    </div>
  )
}
