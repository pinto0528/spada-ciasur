// src/components/Chart.tsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title } from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const Chart: React.FC<{ endpoint: string }> = ({ endpoint }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(endpoint);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                const labels = json.map((item: any) =>
                    new Date(item.avg_time).toLocaleString('en-US', {
                        year: 'numeric', // Año con 4 dígitos
                        month: 'numeric',   // Nombre completo del mes
                        day: 'numeric',  // Día del mes
                        hour: 'numeric', // Hora
                    })
                );

                const getRandomColor = () => {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    return `rgba(${r}, ${g}, ${b}, 1)`;
                };

                const datasets = Object.keys(json[0].avg_data).map((key, index) => {
                    return {
                        label: key,
                        data: json.map((item: any) => item.avg_data[key]),
                        borderColor: getRandomColor(),
                        fill: true,
                        hidden: index !== 0,
                    };
                });

                setData({
                    labels,
                    datasets,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error instanceof Error ? error.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No data available.</div>;
    }

    return (
        <div style={{ width: '100%', height: '90%', position: 'relative' }}>
            <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default Chart;
