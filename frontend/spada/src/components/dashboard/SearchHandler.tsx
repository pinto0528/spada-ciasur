import React, { useState } from 'react';
import AverageSelector from './AverageSelector';
import DataSelector from './DataSelector';
import DateSelector from './DateSelector';
import SearchButton from './SearchButton';

import { API_URL } from '../../utils/api';

interface SearchHandlerProps {
  onSelectEndpoint: (endpoint: string) => void;  // Nueva prop para pasar el endpoint al padre
}

const SearchHandler: React.FC<SearchHandlerProps> = ({ onSelectEndpoint }) => {
  const [interval, setInterval] = useState<string>('hourly');
  const [dataType, setDataType] = useState<string>('nmf2');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Maneja el cambio en el selector de promedio
  const handleIntervalChange = (value: string) => {
    setInterval(value);
  };

  // Maneja el cambio en el selector de datos
  const handleDataTypeChange = (value: string) => {
    setDataType(value);
  };

  // Maneja el cambio en las fechas
  const handleDateChange = (start: string, end: string) => {
    if (start) {
      setStartDate(start);
    }
    if (end) {
      setEndDate(end);
    }
  };

  // Función para realizar la búsqueda
  const handleSearch = async () => {
    const endpoint = `${API_URL}/averages-by-date?data_type=${dataType}&interval=${interval}&start_date=${startDate}&end_date=${endDate}`;
    onSelectEndpoint(endpoint);  // Pasamos el endpoint al componente padre

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);  // Aquí se podría hacer algo con los datos devueltos
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'row', padding:'5px', alignItems:'center'}}>
      <AverageSelector onChange={handleIntervalChange} />
      <DataSelector onChange={handleDataTypeChange} />
      <DateSelector onChange={handleDateChange} />
      <SearchButton onSearch={handleSearch} />
    </div>
  );
};

export default SearchHandler;
