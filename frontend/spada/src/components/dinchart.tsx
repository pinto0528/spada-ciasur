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

import zoomPlugin from 'chartjs-plugin-zoom'; // Importa el plugin

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
        text: 'Parameters Over Time',
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true // Habilita el zoom con la rueda del ratón
        },
        pinch: {
          enabled: true // Habilita el zoom con pellizcos en dispositivos táctiles
        },
        drag: {
          enabled: false // Habilita el desplazamiento (pan) del gráfico
        },
        mode: 'xy' as const // Define el modo de zoom (x, y, o ambos)
      },
      pan: {
        enabled: true,
        mode: 'xy' as const // Define el modo de panorámica (x, y, o ambos)
      }
        }
        },
    scales: {
        y: {
            beginAtZero: true, // Comienza el eje Y en 0
            min: 0 // Define el valor mínimo del eje Y en 0
        }
        }
    };

  return <Line data={chartData} options={options} />;
};

export default DynamicChart;
