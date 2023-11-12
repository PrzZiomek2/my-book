import React, { ReactNode } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link';

interface ExternalLinkProps{
   url: string | undefined;
   children: ReactNode;
};

export const ExternalLink = ({url, children}: ExternalLinkProps) => {
   if(!url) return null;

  return (
   <Link href={url} target='_blank'>
      <span>{children}</span>
      <LaunchIcon />
   </Link>
  )
};
