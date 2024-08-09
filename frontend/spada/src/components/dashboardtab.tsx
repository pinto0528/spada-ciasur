// components/dashboardtab.tsx
'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import RecordTable from './recordtable';
import { API_URL } from '../utils/api';

import tabstyles from '../styles/tabs.module.css'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
import dynamic from 'next/dynamic';

// Importa tu componente dinámicamente
const DynamicChart = dynamic(() => import('../components/dinchart'), { ssr: false });



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
    <Box sx={{ width: '100%' }} className={tabstyles.tab}>
      <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
        <Tab label="Charts" />
        <Tab label="Values" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DynamicChart endpoint={`${API_URL}/records`} title="Real-Time Data" />
        <DynamicChart endpoint={`${API_URL}/daily-average`} title="Daily FOF2 average" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RecordTable />
      </TabPanel>
    </Box>
  );
};

export default DashboardTab;