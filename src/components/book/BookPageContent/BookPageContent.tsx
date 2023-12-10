"use client"
import React, { FC, useContext } from 'react';

import Tabs from '@/components/ui/Tabs';
import { MediaViewportContext } from '@/context/MediaViewportProvider';

interface BookPageContentProps {
   children: React.ReactNode[]
}

export const BookPageContent: FC<BookPageContentProps> = ({children}) => {

   const {isDesktopMax} = useContext(MediaViewportContext); 
   const childArray = React.Children.toArray(children);  
   

   return(
      isDesktopMax ? 
         <Tabs 
            ariaLabel='szczegóły ksiażki'
            items={[
            { 
               panel: childArray[0], 
               tab: { label: "Szczegóły"} 
            },
            { 
               panel: childArray[1],
               tab: { label: "Opinie i komentarze"} 
            },
            ]}
         /> 
      :
         children
   )
}