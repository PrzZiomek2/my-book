import React from 'react';
import { NextPage } from 'next';
import { Loader } from '@/utils/loader';
import { BookOpinions } from '@/components/book/BookOpinions/BookOpinions';
import { BookDetails } from '@/components/book/BookDetails/BookDetails';
import styles from './styles.module.css'

interface BookProps{
  params: { id: string };
  book: {};
};

const getBookAPI = async (bookId: string) => {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
  .catch(err => console.log("error when fetching book", err));

  const resJson = await res?.json(); 
  return resJson;
};

const getBookDB = async (bookId: string) => {
  const res = await fetch(`http://localhost:3000/api/book/${bookId}`)
  .catch(err => console.log("error when fetching book", err));

  const resJson = await res?.json(); console.log({resJson});
  return resJson;
}


 const Book: NextPage<BookProps> = async ({params}) => {
  const bookId = params.id

  let {book} = await getBookDB(bookId);

  if(!book){
    book = await getBookAPI(bookId);
  }

  return (
    <div className={styles.details_page}>
        <Loader isLoading={false}>
          <h2 className={styles.details_header}>{book?.volumeInfo?.title}</h2>
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
        </Loader>
      </div>
  )
}


export default Book;
