import React from 'react';
import { Button, ButtonProps, Link as MuiLink } from '@mui/material';
import Link, {LinkProps} from 'next/link';

interface ButtonLinkProps extends ButtonProps{
  handleClick?: () => void;
  linkHref: LinkProps["href"];
  children: React.ReactNode;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  handleClick,
  linkHref,
  children,
  className,
  ...props
}) => {

  return (
    <Button 
      onClick={handleClick} 
      className={className}
      {...props}
   >
      {linkHref &&
         <Link href={linkHref}>
            {children}
         </Link>
      }
    </Button>
  );
};

export default ButtonLink;