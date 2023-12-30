import React from 'react';

import { Loader } from '@/utils/loader';
import { BookOpinions } from '@/components/book/BookOpinions/BookOpinions';
import { BookDetails } from '@/components/book/BookDetails/BookDetails';
import styles from './styles.module.css'
import { urls } from '@/utils/urls';
import { BookPageContent } from '@/components/book/BookPageContent/BookPageContent';

const {rootPath} = urls();
interface BookProps{
  params: { id: string };
};

const getBookAPI = async (bookId: string) => {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
  .catch(err => console.log("error when fetching book", err));

  const resJson = await res?.json(); 
  return resJson;
};

const getBookDB = async (bookId: string) => {
  const res = await fetch(`${rootPath}/api/book/${bookId}`)
  .catch(err => console.log("error when fetching book", err));

  const resJson = await res?.json(); 
  return resJson;
}


 const Book = async ({params}: BookProps) => {
  const bookId = params.id
  
  let {book} = await getBookDB(bookId);

  if(!book){
    book = await getBookAPI(bookId); 
  }; 
  
  return (
    <div className={styles.details_page}>
        <Loader isLoading={false}>
          <h2 className={styles.details_header} data-cy="title">{book?.volumeInfo?.title}</h2>
          <BookPageContent>
            <section className={styles.details_info}>
              {book && 
                <BookDetails 
                    currentBook={book}
                />}
            </section>
            <section className={styles.details_opinions}>
            <BookOpinions 
              bookId={book?.id}
            />
            </section>
          </BookPageContent>     
        </Loader>
      </div>
  )
}


export default Book;
