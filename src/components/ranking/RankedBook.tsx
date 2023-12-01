"use client"
import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import truncate from 'lodash.truncate';

import { RankingBook } from '@/types/interfaces';
import { Card } from '@/components/ui/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BookDefault } from '@/types/interfaces';
import { BookActions } from '../commons/BookActions';
import RatingStars from '../commons/RatingStarts';
import { ExternalLink } from '../ui/ExternalLink';

interface RankingBookProps{
  book: RankingBook;
  id: string;
}

export const RankedBook: FC<RankingBookProps> = ({book, id}) => {
  const {imageLink, title, authors, subtitle, rate, opinions, favourite, read, infoLink} = book;   console.log({book});
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
        // className={styles.book_list_item_img}
          height={190}
          alt='okładka'
        /> :
        <div className={"styles.cover_replace"}>Podgląd niedostępny</div>}

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex"
        }}
      >
        <Box>
          <Typography 
            gutterBottom variant="h5" 
            component="div"
            sx={{ 
                display: "flex",
                flexDirection: "column",
                fontSize: "1.2rem"
            }}
          >
            <Link className={"styles.book_title_link"} href={`/book/${id}`}>{titleFragment}</Link>
            <span className={"styles.book_authors"}>{authors}</span>
          </Typography>   
          <Typography variant="body2" color="text.secondary">
            <Box>{subtitle}</Box>
          </Typography>
          <ExternalLink url={infoLink}>Więcej informacji</ExternalLink>
        </Box>
        <Box>
          <RatingStars score={Number(rate)}/>
          <Box>
            <Typography>Opinie: {opinions}</Typography>
            <Typography>Przeczytane: {read?.length}</Typography>
            <Typography>Ulubione: {favourite?.length}</Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{flexDirection: "column"}}>
        {book && 
          <BookActions
            // className={styles.search_list_actions}
              book={book}
          />}
      </CardActions>
    </Card>
  )
}
