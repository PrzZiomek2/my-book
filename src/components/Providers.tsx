"use client";

import React, { ReactNode } from 'react';
import {SessionProvider} from 'next-auth/react';
import { SWRConfig } from 'swr'
import { MediaViewportProvider } from '@/context/MediaViewportProvider';

interface ProvidersProps {
   children: ReactNode;
}

export default function Providers({children}: ProvidersProps)  {
  return (
    <SessionProvider>
      <MediaViewportProvider>
        <SWRConfig 
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
            revalidateOnFocus: false
          }}
        >
        {children}
        </SWRConfig>
      </MediaViewportProvider>
    </SessionProvider>
  )
}
