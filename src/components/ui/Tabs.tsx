"use client";
import React, {ReactNode, useState, useEffect, FC, SyntheticEvent, useContext} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MediaViewportContext } from '@/context/MediaViewportProvider';

interface TabPanelProps {
  children?: ReactNode;
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
          {children}
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
  className?: string;
  items: {
    panel: ReactNode;
    tab: { label: string }
  }[];
  ariaLabel: string;
  orientation?:  "vertical" | "horizontal"
 }

const CustomTabs: FC<CustomTabsProps> = ({items, ariaLabel, className, orientation = "vertical"}) => {
  const [value, setValue] = useState(0);
  const [newOrientation, setNewOrientation] = useState(orientation);
  const {isTabletMax} = useContext(MediaViewportContext); 

  useEffect(() => {
    if(isTabletMax){
      setNewOrientation("horizontal")
    }
  }, [isTabletMax])

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: newOrientation === "horizontal" ? "column" : "row" 
       }}
    >
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
         orientation={newOrientation}
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