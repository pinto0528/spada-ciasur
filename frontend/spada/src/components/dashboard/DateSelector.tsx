import React, { useEffect, useState } from 'react';

type DateSelectorProps = {
  onChange: (startDate: string, endDate: string) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({ onChange }) => {
  // Calcula la fecha de hoy y mañana
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Convierte las fechas a formato ISO (YYYY-MM-DD)
  const formatDate = (date: Date) =>
    date.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(tomorrow));

  // Llama a `onChange` con los valores iniciales
  useEffect(() => {
    onChange(startDate, endDate);
  }, [startDate, endDate, onChange]);

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
        <div style={{marginRight:'5px',  border:'1px solid #5e5ef3', borderRadius:'5px'}}>
        <label htmlFor="start-date" style={{marginRight:'5px', marginLeft:'5px'}}>Since</label>
        <input
            style={{marginRight:'10px',}}
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => {
            const newStartDate = e.target.value;
            setStartDate(newStartDate);
            onChange(newStartDate, endDate);
            }}
        />
        </div>
    
        <div style={{marginRight:'5px',  border:'1px solid #5e5ef3', borderRadius:'5px'}}>
        <label htmlFor="end-date" style={{marginRight:'5px',  marginLeft:'5px'}}>To</label>
        <input
            style={{marginRight:'10px',}}
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => {
            const newEndDate = e.target.value;
            setEndDate(newEndDate);
            onChange(startDate, newEndDate);
            }}
        />
        </div>
    </div>
  );
};

export default DateSelector;
