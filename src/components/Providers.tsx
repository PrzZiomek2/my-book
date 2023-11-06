"use client";

import React, { ReactNode } from 'react';
import {SessionProvider} from 'next-auth/react';
import { SWRConfig } from 'swr'

interface ProvidersProps {
   children: ReactNode;
}

export default function Providers({children}: ProvidersProps)  {
  return (
    <SessionProvider>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
          suspense: true
        }}
      >
      {children}
      </SWRConfig>
    </SessionProvider>
  )
}
