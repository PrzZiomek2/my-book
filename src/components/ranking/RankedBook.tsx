"use client"
import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import truncate from 'lodash.truncate';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { RankingBook } from '@/types/interfaces';
import { Card } from '@/components/ui/Card';
import { BookActions } from '../commons/BookActions';
import RatingStars from '../commons/RatingStarts';
import styles from './styles.module.css';
import { Tag } from '@/components/ui/Tag';

interface RankingBookProps{
  book: RankingBook;
  id: string;
}

export const RankedBook: FC<RankingBookProps> = ({book, id}) => { 
  const {imageLink, title, authors, subtitle, rate, opinions, favourite, read, categories} = book;

  const categoriesExtracted = categories ? categories.map(value => {
    const subCats = value.split("/");
    const lastSubCatValues = subCats[subCats.length - 1].split(" ");
    return lastSubCatValues[lastSubCatValues.length - 1];
  }) : [];
  
  const titleFragment = truncate(title, { 
    length: 80,
    separator: /,? +/,
  });

  return (
    <Card key={id}>
      {imageLink ?
        <Image
          src={imageLink}  
          width={140}
          className={styles.book_list_item_img}
          height={190}
          alt='okładka'
        /> :
        <div className={styles.cover_replace}>Podgląd niedostępny</div>}

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: "20px"
        }}
      >
        <Box 
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography 
              gutterBottom variant="h5" 
              component="div"
              sx={{ 
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "1.4rem",
              }}
            >
              <Link className={styles.book_title_link} href={`/book/${id}`}>{titleFragment}</Link>
              <span className={styles.book_authors}>{authors}</span>
            </Typography>   
            <Typography variant="body2" color="text.secondary">
              <Box>{subtitle}</Box>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: "-8px"
            }} 
           >
            {categoriesExtracted.map(cat => (
              <Tag 
                key={cat} 
                data={cat}
                small
              />
            ))}
          </Box>
          {/* <ExternalLink url={infoLink}>Google Books</ExternalLink> */}
        </Box>
        <Box
          sx={{
            marginTop: "3px",
            marginRight: "40px"
          }}
         >
          <RatingStars score={Number(rate)}/>
          <Box marginTop="10px">
            <Typography>Opinie: {opinions}</Typography>
            {read?.length > 0 && <Typography>Przeczytane: {read?.length}</Typography>}
            {favourite?.length > 0 && <Typography>Ulubione: {favourite?.length}</Typography>}
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{
        flexDirection: "column",
      }}>
        {book && 
          <BookActions
              className={styles.search_list_actions}
              book={book}
          />}
      </CardActions>
    </Card>
  )
}
