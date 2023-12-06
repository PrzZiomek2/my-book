import React from 'react';

import styles from './styles.module.css';

import Accordion from '@/components/ui/Accordion';
import { DefaultCriteria } from '../DefaultCriteria';

const CriteriaForm = React.lazy(() => import('../CriteriaForm'));

export const SuggestionsCriteria = () => {
  return (
    <section className={styles.criteriaSection}>
       <Accordion 
          title="Propozycje czytelnicze dla Ciebie"
          id='suggestions1'
          defaultExpanded={true}
         >
        <DefaultCriteria />
      </Accordion>
      <Accordion 
          title="Propozycje na podstawie kryteriów podanych poniżej. Aby wyszukać naciśnij Gotowe"
          id='suggestions2'
         >
         <CriteriaForm />
      </Accordion>
    </section>
  )
}
