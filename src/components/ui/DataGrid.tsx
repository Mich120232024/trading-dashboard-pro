import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

interface Column<T> {
  field: keyof T;
  header: string;
  sortable?: boolean;
  width?: string;
  renderCell?: (row: T) => React.ReactNode;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
  onRowClick?: (row: T) => void;
}

function DataGrid<T extends { id?: string | number }>({ 
  columns,
  data,
  loading = false,
  sortable = true,
  filterable = true,
  pagination = true,
  pageSize = 10,
  className = '',
  onRowClick
}: DataGridProps<T>) {
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter data
  const filteredData = data.filter(row => 
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === bValue) return 0;
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const compareResult = aValue < bValue ? -1 : 1;
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handleSort = (field: keyof T) => {
    if (!sortable) return;
    
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const LoadingRow = () => (
    <tr>
      <td colSpan={columns.length} className="px-4 py-8 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-text-secondary rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-text-secondary rounded-full animate-bounce delay-100" />
          <div className="w-4 h-4 bg-text-secondary rounded-full animate-bounce delay-200" />
        </div>
      </td>
    </tr>
  );

  return (
    <div className={`glass-morphism rounded-lg ${className}`}>
      {/* Toolbar */}
      {(filterable || sortable) && (
        <div className="p-4 border-b border-text-secondary/10">
          <div className="flex items-center justify-between gap-4">
            {filterable && (
              <div className="flex-1 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background-secondary rounded-lg
                      border border-text-secondary/20 focus:border-accent-orange/50
                      focus:ring-2 focus:ring-accent-orange/20 transition-all duration-200"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg transition-colors
                    ${showFilters ? 'bg-accent-orange/20 text-accent-orange' : 
                    'hover:bg-text-secondary/10'}`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-text-secondary/10"
              >
                {/* Add custom filters here */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-text-secondary/10">
              {columns.map((column) => (
                <th
                  key={String(column.field)}
                  className={`px-4 py-3 text-left text-sm font-medium text-text-secondary
                    ${column.width ? column.width : ''}
                    ${column.sortable !== false && sortable ? 'cursor-pointer hover:text-text-primary' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.field)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.header}</span>
                    {column.sortable !== false && sortable && sortField === column.field && (
                      <span>
                        {sortDirection === 'asc' ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        }
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingRow />
            ) : paginatedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-text-secondary"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <motion.tr
                  key={row.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-text-secondary/10 
                    ${onRowClick ? 'cursor-pointer hover:bg-text-secondary/5' : ''}`}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.field)}
                      className="px-4 py-3"
                    >
                      {column.renderCell 
                        ? column.renderCell(row)
                        : String(row[column.field] ?? '')}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="p-4 border-t border-text-secondary/10 flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md transition-colors
                  ${currentPage === page
                    ? 'bg-accent-orange text-white'
                    : 'hover:bg-text-secondary/10'}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataGrid;