"use client";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other} 
    >
      {value === index && (
        <Box sx={{ p: 3, padding: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface CustomTabsProps {
   items: {
      panel: React.ReactNode;
      tab: { label: string }
   }[];
   ariaLabel: string;
   orientation?:  "vertical" | "horizontal"
 }

const CustomTabs: React.FC<CustomTabsProps> = ({items, ariaLabel, className, orientation = "vertical"}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: orientation === "horizontal" ? "column" : "row" }}>
      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider' ,
          marginRight: "30px",
          minWidth: "150px"
        }
      }>
        <Tabs 
         value={value} 
         onChange={handleChange} 
         aria-label={ariaLabel}
         orientation={orientation}
         className={className}
        >
         {items.map(({tab}, i) => (
             <Tab key={i} label={tab.label} {...a11yProps(i)} />
         ))}
        </Tabs>
      </Box> 
      <Box sx={{ width: "100%" }}>
         {items.map(({panel}, i) => (
            <TabPanel key={i} value={value} index={i}>{panel}</TabPanel>
         ))}
      </Box>
    </Box>
  );
}

export default CustomTabs;