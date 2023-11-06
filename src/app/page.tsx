import React from 'react';
import { NextPage } from 'next';
import { BookSearch } from '@/components/home/bookSearch/BookSearch';

const Home: NextPage = () => {
 
  return (
    <div className='home'>
      <section>
        <h2>Wyszukaj pozycje</h2>
        <BookSearch />
      </section>
         
      <section>
      </section>        
    </div>
  )
}

export default Home;