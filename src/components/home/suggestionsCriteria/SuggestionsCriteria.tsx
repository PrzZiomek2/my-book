import React from 'react';

import Typography from '@mui/material/Typography';
import { CriteriaForm } from '../parts/CriteriaForm';

import Accordion from '@/components/ui/Accordion';

export const SuggestionsCriteria = () => {
  return (
    <section>
       <Accordion 
          title="Propozycje czytelnicze dla Ciebie"
          id='suggestions1'
          defaultExpanded={true}
         >
        <Typography>
            Domyślnie pokazujemy sugestie na podstawie informacji jakie podałeś w profilu, czyli opis, tagi oraz lista ulubionych i
             przeczytanych książek. Jeżeli nie podałeś żadnych informacji to wyświetlamy liste naszych propozycji bazującej na trendach.
          </Typography>
      </Accordion>
      <Accordion 
          title="Propozycje na podstawie kryteriów podanych poniżej. Aby wyszukać naciśnij Gotowe"
          id='suggestions2'
          defaultExpanded={false}
         >
         <CriteriaForm />
      </Accordion>
    </section>
  )
}
