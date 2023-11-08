import { ThemeProvider } from '@mui/material/styles';
import Providers from '@/components/Providers'
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';

import { Inter } from 'next/font/google'
import { Header } from '@/components/commons/header/Header'
import Container from '@mui/material/Container';
import ThemeRegistry from './ThemeRegistry';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Library app',
  description: 'A social platform for book lovers',
}


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Providers>
        <ThemeRegistry options={{ key: 'mui' }}>
          <body className={inter.className}>
            <Header />
            <Container>
              <main>
                {children}
            </main>
            </Container>
          </body>
        </ThemeRegistry>
      </Providers>
    </html>
  )
}
