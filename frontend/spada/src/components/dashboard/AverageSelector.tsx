import React from 'react';

type AverageSelectorProps = {
  onChange: (interval: string) => void;
};

const AverageSelector: React.FC<AverageSelectorProps> = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="average-selector">Select Average:</label>
      <select id="average-selector" onChange={(e) => onChange(e.target.value)}>
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="anuel">Anuel</option>
      </select>
    </div>
  );
};

export default AverageSelector;
