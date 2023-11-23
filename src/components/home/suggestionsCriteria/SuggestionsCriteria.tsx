import React from 'react';

import { CriteriaForm } from '../CriteriaForm';
import styles from './styles.module.css';

import Accordion from '@/components/ui/Accordion';
import { DefaultCriteria } from '../DefaultCriteria';

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
         // defaultExpanded={false}
         >
         <CriteriaForm />
      </Accordion>
    </section>
  )
}
