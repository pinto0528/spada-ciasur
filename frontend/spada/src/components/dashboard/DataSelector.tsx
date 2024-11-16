import React from 'react';

type DataSelectorProps = {
  onChange: (dataType: string) => void;
};

const DataSelector: React.FC<DataSelectorProps> = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="data-selector">Select Data Type:</label>
      <select id="data-selector" onChange={(e) => onChange(e.target.value)}>
        <option value="ionospheric">Ionospheric</option>
        <option value="solar">Solar</option>
        <option value="nmf2">NmF2</option>
        <option value="perritos">Perritos</option>
      </select>
    </div>
  );
};

export default DataSelector;
