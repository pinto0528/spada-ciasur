import React from 'react';
import { API_URL } from '../../utils/api';

interface ComboBoxProps {
    onSelect: (endpoint: string) => void; // Función para pasar el endpoint seleccionado
}

const ComboBox: React.FC<ComboBoxProps> = ({ onSelect }) => {
    const options = [
        { label: 'Solar Hourly', value: `${API_URL}/averages?data_type=solar&interval=hourly` },
        { label: 'Solar Daily', value: `${API_URL}/averages?data_type=solar&interval=daily` },
        { label: 'Solar Monthly', value: `${API_URL}/averages?data_type=solar&interval=monthly` },
        { label: 'Ionospheric Hourly', value: `${API_URL}/averages?data_type=ionospheric&interval=hourly` },
        { label: 'Ionospheric Daily', value: `${API_URL}/averages?data_type=ionospheric&interval=daily` },
        { label: 'Ionospheric Monthly', value: `${API_URL}/averages?data_type=ionospheric&interval=monthly` },
    ];

    return (
        <select style={{maxWidth: '30%', margin: '5px 0px 5px 5px'}} onChange={(e) => onSelect(e.target.value)} defaultValue="">
            <option  value="" disabled></option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default ComboBox;
