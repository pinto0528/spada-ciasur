// components/dinchart.tsx
'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

interface DynamicChartProps {
  endpoint: string;
  title: string;
  keyForLabel?: string; // Optional key to use for labels
}

const DynamicChart: React.FC<DynamicChartProps> = ({ endpoint, title, keyForLabel }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const result = await response.json();
        setData(result);
        console.log('Fetched data:', result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endpoint]);

  // Extract labels from the data
  const labels = data.length > 0 ? data.map((record: any) => record.date || record.dt) : [];

  // Check if data is not empty before accessing its first item
  const firstItem = data.length > 0 ? data[0] : {};
  const datasetConfig = firstItem ? Object.keys(firstItem)
    .filter(key => key !== 'date' && key !== 'dt') // Exclude date fields or other non-numeric fields
    .map(key => ({
      label: key,
      key: key,
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(0.2),
    }))
    : [];

  const chartData = {
    labels: labels,
    datasets: datasetConfig.map(config => ({
      label: config.label,
      data: data.map((record: any) => record[config.key]),
      borderColor: config.borderColor,
      backgroundColor: config.backgroundColor,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          drag: {
            enabled: false,
          },
          mode: 'xy' as const,
        },
        pan: {
          enabled: true,
          mode: 'xy' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
  };

  function getRandomColor(alpha: number = 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return <Line data={chartData} options={options} />;
};

export default DynamicChart;
