import React from 'react';
import './Shared.css';

const Table = ({ columns, data, keyField }) => {
    return (
        <div className="shared-table-container">
            <table className="shared-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={row[keyField] || rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="empty-state">No data available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
