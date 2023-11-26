import React from 'react';
import { NextPage } from 'next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Name } from '@/types/enums';

 const About: NextPage = () => {
  
  return (
    <Box sx={{
      margin: "auto",
      marginTop: "35px",
      maxWidth: "1200px"
    }}>
      <Typography variant='h4'>O nas</Typography>
      <Box marginTop="20px">
        <Typography paragraph>
            <b>{Name.APP}</b> to nie tylko aplikacja podpowiadajaca jakie następne książki przeczytać. <b>{Name.APP}</b> to 
             miejsce stworzone z pasji do czytania i dzielenia się nią z innymi. Jeśli kochasz czytać książki, 
            a do tego chciałbyś być częścią naszej społeczności, to miejsce jest dla Ciebie.
            Zależy nam na tym, aby czytanie było nie tylko okazyjnym zajęciem, ale stało się częścią stylu życia, zdrowym nawykiem.      
            Dlatego nasza aplikacja nie tylko dostarcza sugestii książek dostosowanych do Twoich gustów, 
            ale także pomaga śledzić Twoje postępy, tworzyć listy ulubionych i przeczytanych książek.
        </Typography>
        <Typography paragraph>
            Bez względu na to, czy jesteś zapalonym czytelnikiem czy dopiero zaczynasz swoją literacką podróż, tutaj znajdziesz miejsce 
            dla siebie. Każdą pozycję możesz oceniać i dodawać opinie, dzieląc się refleksjami na temat przeczytanych dzieł. Oceniane 
            książki wraz z opiniami trafiają do rankingu, a członkowie mogą zobaczyć 
            jakie opinie dodali pozostali. Każda recenzja ma znaczenie, każda sugestia jest cennym wkładem w literacką społeczność.
        </Typography>
      </Box>
      <Box marginTop="40px">
        <Typography variant='h5' marginBottom="15px">Jak to działa?</Typography>
        <Typography paragraph>
            Najlepszą drogą na rozpoczęcie przygody z <b>{Name.APP}</b> jest założenie konta, które jesty darmowe.
            Po weryfikacji adresu email możesz się zalogować, za pomocą hasła podanego podczas rejestracji. Poprzez menu możesz wejsc na zakładkę profil i
            dodac tam zdjęcie, opis i tagi. Możesz też wygenerować tagi na podstawie opisu. Po prawej stronie będą zakładki z listami książek, 
            twoje ulubione, oraz przeczytane. Tam pojawią się książki które dodasz, te wyszukane lub te sugerowane. Na stronie głównej, w pierszej
            możesz wygenerować sugestie na podstawie informacji z profilu i list twoich książek. W drugiej sekcji możesz stworzyć sugestie na podstawie wypełnionego formularza, 
            nawet jednego pola. Niezależnie, czy z profilu czy informacji zawartych w formularzu, powstanie lista dopasowanych ksiażek. Książki z listy, 
            tak samo jak listy wyników wyszukiwania, można podejrzeć szczegóły i dodać do swojej listy. Można generować jedną listę dziennie, 
            co wynika z ograniczenia nałożonego w celu uniknięcia przeciążenia.
        </Typography>
      </Box>
    </Box>
  )
}

export default About;