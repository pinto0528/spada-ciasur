// components/RecordTable.tsx
'use client';

import React, { useState, useEffect } from 'react';
import tablestyles from '../styles/recordtable.module.css';
import { API_URL } from '../utils/api';

interface Record {
  [key: string]: string | number | boolean | undefined;
}

const Table: React.FC = () => {
  const [data, setData] = useState<Record[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Define which columns should be visible by default
  const defaultVisibleColumns = ['id','dt', 'fof2', 'muf3000f2','m3000f2','fxi','fof1','ftes'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/records`); // Replace with your actual endpoint
        const result = await response.json();
        setData(result);

        if (result.length > 0) {
          // Set visible columns with default columns and all columns from data
          const allColumns = Object.keys(result[0]);
          setVisibleColumns((prev) => 
            allColumns.filter((col) => defaultVisibleColumns.includes(col))
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <div className={tablestyles.dropdownContainer}>
        <button
          className={tablestyles.dropdownButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Select Columns
        </button>
        {isDropdownOpen && (
          <div className={tablestyles.dropdownContent}>
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
        )}
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
