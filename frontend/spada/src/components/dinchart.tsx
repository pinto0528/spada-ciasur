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
