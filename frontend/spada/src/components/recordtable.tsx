// components/recordtable.tsx
'use client';
import React from 'react';
import tablestyles from '../styles/recordtable.module.css';

// Define a Record type as a dictionary to handle flexible fields
interface Record {
  [key: string]: string | number | boolean | undefined; // Adaptable for various data types
}

interface TableProps {
  data: Record[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  // Determine the headers from the keys of the first record
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className={tablestyles.tableContainer}>
    <table className={tablestyles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className={tablestyles.th}>{header.replace(/_/g, ' ').toUpperCase()}</th> // Replace underscores and capitalize headers
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header} className={tablestyles.td}>
                {typeof record[header] === 'boolean'
                  ? record[header]
                    ? 'Yes'
                    : 'No'
                  : record[header] ?? '-'} {/* Handle boolean values and undefined */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
