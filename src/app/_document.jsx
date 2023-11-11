import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang='pl'>
      <Head>
          <title>MyBooks - aplikacja miłośników książek</title>
          <meta
            name="description"
            content="platforma dla wszystkich wielbicieli książek. Do przeglądania, oceniania i komentowania pozycji literackich"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet='utf-8' />
          <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round"rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}