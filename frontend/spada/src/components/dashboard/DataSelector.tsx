import React from 'react';

type DataSelectorProps = {
  onChange: (dataType: string) => void;
};

const DataSelector: React.FC<DataSelectorProps> = ({ onChange }) => {
  return (
    <div style={{marginRight:'6px'}}>
      <select 
        style={{padding:'2px',fontSize:'0.85rem', border:'1px solid #5e5ef3',borderRadius:'5px'}}
        id="data-selector"
        defaultValue="" 
        onChange={(e) => onChange(e.target.value)}
        >
        <option  value="" disabled>Data</option>
        <option value="ionospheric">Ionospheric</option>
        <option value="solar">Solar</option>
        <option value="nmf2">NmF2</option>
        <option value="perritos">Perritos</option>
      </select>
    </div>
  );
};

export default DataSelector;
