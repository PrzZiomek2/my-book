import React from 'react'

import Typography from '@mui/material/Typography';
import ButtonLink from '@/components/ui/ButtonLink';

export const DefaultCriteria = () => {
  return (
    <div>
      <Typography>
         Domyślnie pokazujemy sugestie na podstawie informacji jakie podałeś w profilu, czyli opis, tagi oraz lista ulubionych i
         przeczytanych książek. Kliknij Wyniki aby zobaczyć propozycje.
      </Typography>
      <ButtonLink
         linkHref={{
          pathname: '/suggestions-results',
          query: { fromProfile: true },
        }}
         variant="contained"
         sx={{marginTop: "20px"}}
      >
        Wyniki
      </ButtonLink>
    </div>
  )
}
