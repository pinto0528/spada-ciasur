import React from 'react';

type AverageSelectorProps = {
  onChange: (interval: string) => void;
};

const AverageSelector: React.FC<AverageSelectorProps> = ({ onChange }) => {
  return (
    <div style={{marginRight:'6px'}}>
      <select
        style={{padding:'2px',fontSize:'0.85rem', border:'1px solid #5e5ef3',borderRadius:'5px'}} 
        id="average-selector"
        defaultValue="" 
        onChange={(e) => onChange(e.target.value)}
        >
        <option  value="" disabled>Interval</option>
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="anuel">Anuel</option>
      </select>
    </div>
  );
};

export default AverageSelector;
