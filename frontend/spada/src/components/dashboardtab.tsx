// components/DashboardTabs.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import DynamicChart from './dinchart';
import RecordTable from './recordtable';

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
        <Tab label="Charts" />
        <Tab label="Values" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DynamicChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RecordTable />
      </TabPanel>
    </Box>
  );
};

export default DashboardTab;