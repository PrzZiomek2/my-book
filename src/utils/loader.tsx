import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
   children: React.ReactNode | React.ReactNode[];
   isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({children, isLoading}) => {

   return (isLoading ? <CircularProgress /> : <>{children}</>)
   
}