import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  headers,
  children,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-150 bg-white ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-150">
            {headers.map((h, i) => (
              <th 
                key={i} 
                className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
