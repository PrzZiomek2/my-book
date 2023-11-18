import Providers from '@/components/Providers'
import './globals.css';

// import { Inter } from 'next/font/google'
import { Header } from '@/components/commons/header/Header'
import Container from '@mui/material/Container';
import ThemeRegistry from './ThemeRegistry';

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Library app',
  description: 'A social platform for book lovers',
}


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeRegistry options={{ key: 'mui' }}>
              <Header />
              <Container>
                <main>
                  {children}
              </main>
              </Container>  
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  )
}
