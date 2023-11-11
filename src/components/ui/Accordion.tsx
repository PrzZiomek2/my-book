import React, { ReactNode } from 'react';

import {
  Accordion as AccordionMUI,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionProps {
   title: string;
   children: ReactNode;
   id: string;
   expanded?: boolean;
   defaultExpanded?: boolean;
 }

export const Accordion = ({ title, children, id, expanded, defaultExpanded }: AccordionProps) => {
  return (
    <AccordionMUI 
      expanded={expanded}
      defaultExpanded
      sx={{
         background: "aqua"
      }}
   >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </AccordionMUI>
  );
};

export default Accordion;
