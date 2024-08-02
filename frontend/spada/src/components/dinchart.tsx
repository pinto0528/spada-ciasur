// components/DynamicChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DynamicChartProps {
  data: any[];
}

const DynamicChart: React.FC<DynamicChartProps> = ({ data }) => {
  // Prepara los datos para el gráfico
  const chartData = {
    labels: data.map((record) => record.dt),
    datasets: [
      {
        label: 'FOF2',
        data: data.map((record) => record.fof2),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'MUF3000F2',
        data: data.map((record) => record.muf3000f2),
        borderColor: 'rgba(20, 20, 192, 1)',
        backgroundColor: 'rgba(20, 20, 192, 0.2)',
      },
      {
        label: 'M3000F2',
        data: data.map((record) => record.m3000f2),
        borderColor: 'rgba(60, 100, 15, 1)',
        backgroundColor: 'rgba(60, 100, 15, 0.2)',
      },
      {
        label: 'FXI',
        data: data.map((record) => record.fxi),
        borderColor: 'rgba(130, 100, 15, 1)',
        backgroundColor: 'rgba(130, 100, 15, 0.2)',
      },
      {
        label: 'FOF1',
        data: data.map((record) => record.fof1),
        borderColor: 'rgba(200, 100, 50, 1)',
        backgroundColor: 'rgba(200, 100, 50, 0.2)',
      },
      {
        label: 'FTES',
        data: data.map((record) => record.ftes),
        borderColor: 'rgba(150, 180, 50, 1)',
        backgroundColor: 'rgba(150, 180, 50, 0.2)',
      },
      {
        label: 'H ES',
        data: data.map((record) => record.h_es),
        borderColor: 'rgba(150, 56, 50, 1)',
        backgroundColor: 'rgba(150, 56, 50, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Aquí aseguramos que el valor sea uno de los permitidos
      },
      title: {
        display: true,
        text: 'FOF2 Over Time',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default DynamicChart;
