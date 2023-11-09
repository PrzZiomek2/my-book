import React from 'react';
import { NextPage } from 'next';
import { BookSearchPanel } from '@/components/home/bookSearch/BookSearchPanel';

const Home: NextPage = () => {
 
  return (
    <div className='home'>
      <section>
        <h2>Wyszukaj pozycje</h2>
        <BookSearchPanel />
      </section>
         
      <section>
      </section>        
    </div>
  )
}

export default Home;