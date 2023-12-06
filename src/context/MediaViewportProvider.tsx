import React, { FC, createContext } from "react";
import { Breakpoint } from "@/types/enums";
import { useMatchMedia } from "@/utils/customHooks/useMatchMedia";

const MediaViewportDefaultValues = {
   isWidescreenMax: false,
   isDesktopMax: false,
   isTabletMax: false,
   isMobileMax: false
 };

export const MediaViewportContext = createContext(MediaViewportDefaultValues);

interface MediaViewportProviderProps{
   children: React.ReactNode
}

export const MediaViewportProvider: FC<MediaViewportProviderProps> = ({children}) => {
   const isWidescreenMax = useMatchMedia(`screen and (max-width: ${Breakpoint.WIDESCREEN}px)`);
   const isDesktopMax = useMatchMedia(`screen and (max-width: ${Breakpoint.DESKTOP}px)`);
   const isTabletMax = useMatchMedia(`screen and (max-width: ${Breakpoint.TABLET}px)`);
   const isMobileMax = useMatchMedia(`screen and (max-width: ${Breakpoint.MOBILE}px)`);
   
   const viewport = {
      isWidescreenMax,
      isDesktopMax,
      isTabletMax,
      isMobileMax
   }
 
   return (
      <MediaViewportContext.Provider value={viewport}>{children}</MediaViewportContext.Provider>
   )
}