// components/DashboardTabs.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import DynamicChart from './dinchart';// Suponiendo que tienes otro componente que mostrar

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const DashboardTab: React.FC = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
        <Tab label="Chart" />
        <Tab label="Another Tab" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DynamicChart data={data}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
    </Box>
  );
};

export default DashboardTab;