import React, { ReactNode } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link';
import styles from './styles.module.css';

interface ExternalLinkProps{
   url: string | undefined;
   children: ReactNode;
};

export const ExternalLink = ({url, children, ...props}: ExternalLinkProps) => {
   if(!url) return null;

  return (
   <Link 
      {...props}
      href={url} 
      target='_blank'
      className={styles.link}
   >
      <span>{children}</span>
      <LaunchIcon fontSize='small' />
   </Link>
  )
};
