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
                const labels = json.map((item: any) => new Date(item.avg_time).toLocaleTimeString());

                const datasets = Object.keys(json[0].avg_data).map((key, index) => {
                    return {
                        label: key,
                        data: json.map((item: any) => item.avg_data[key]),
                        borderColor: `rgba(${index * 50}, ${100 + index * 30}, ${150}, 1)`,
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
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default Chart;
