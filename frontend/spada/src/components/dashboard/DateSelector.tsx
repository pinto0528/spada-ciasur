import React from 'react';

type DateSelectorProps = {
  onChange: (startDate: string, endDate: string) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="start-date">Start Date:</label>
      <input
        id="start-date"
        type="date"
        onChange={(e) => onChange(e.target.value, '')}
      />
      <label htmlFor="end-date">End Date:</label>
      <input
        id="end-date"
        type="date"
        onChange={(e) => onChange('', e.target.value)}
      />
    </div>
  );
};

export default DateSelector;
