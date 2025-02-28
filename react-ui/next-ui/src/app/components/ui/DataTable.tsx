// src/components/ui/DataTable.tsx
import React from 'react';
import { UserPlus } from 'lucide-react';

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, string>[];
  title: string;
  onAddClick?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, title, onAddClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                {columns.map((column) => (
                  <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                    {column.accessor === 'status' ? (
                      <span
                        className={`px-2 py-1 bg-${
                          row[column.accessor] === 'Stable' ? 'green' : 'red'
                        }-100 text-${
                          row[column.accessor] === 'Stable' ? 'green' : 'red'
                        }-800 rounded-full text-xs font-medium`}
                      >
                        {row[column.accessor]}
                      </span>
                    ) : (
                      <span className="text-gray-600">{row[column.accessor]}</span>
                    )}
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

export default DataTable;