// components/RecordTable.tsx
'use client';
import { API_URL } from '../utils/api';
import React, { useState, useEffect } from 'react';
import tablestyles from '../styles/recordtable.module.css';

// Define a Record type as a dictionary to handle flexible fields
interface Record {
  [key: string]: string | number | boolean | undefined; // Adaptable for various data types
}

const Table: React.FC = () => {
  const [data, setData] = useState<Record[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/records`); // Replace with your actual endpoint
        const result = await response.json();
        setData(result);

        // Set all columns as visible by default
        if (result.length > 0) {
          setVisibleColumns(Object.keys(result[0]));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Toggle visibility of columns
  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column) // Hide column
        : [...prev, column] // Show column
    );
  };

  // Determine the headers from the keys of the first record
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <div className={tablestyles.columnSelector}>
        {headers.map((header) => (
          <label key={header} className={tablestyles.columnCheckbox}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(header)}
              onChange={() => handleColumnToggle(header)}
            />
            {header.replace(/_/g, ' ').toUpperCase()}
          </label>
        ))}
      </div>

      <div className={tablestyles.tableContainer}>
        <table className={tablestyles.table}>
          <thead>
            <tr>
              {visibleColumns.map((header) => (
                <th key={header} className={tablestyles.th}>
                  {header.replace(/_/g, ' ').toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index}>
                {visibleColumns.map((header) => (
                  <td key={header} className={tablestyles.td}>
                    {typeof record[header] === 'boolean'
                      ? record[header]
                        ? 'Yes'
                        : 'No'
                      : record[header] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
