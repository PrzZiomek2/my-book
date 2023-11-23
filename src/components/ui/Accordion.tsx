import React, { ReactNode } from 'react';

import AccordionMUI from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
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
      defaultExpanded={defaultExpanded}
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
