import React from 'react';


interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const maxVisiblePages = 5;

  if (totalPages <= 1) return null;
  
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`cursor-pointer p-2 rounded-md ${currentPage === 1 ? 
          'text-gray-400 cursor-not-allowed' : 
          'text-[#002963] hover:bg-[#002963] hover:text-white'}`}
        aria-label="Primeira página"
      >
        <i className="bi bi-chevron-double-left"></i>
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`cursor-pointer p-2 rounded-md ${currentPage === 1 ? 
          'text-gray-400 cursor-not-allowed' : 
          'text-[#002963] hover:bg-[#002963] hover:text-white'}`}
        aria-label="Página anterior"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`cursor-pointer w-10 h-10 rounded-md ${currentPage === page ? 
            'bg-[#002963] text-white' : 
            'text-[#002963] hover:bg-[#f09700] hover:text-white'}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${currentPage === totalPages ? 
          'text-gray-400 cursor-not-allowed' : 
          'text-[#002963] hover:bg-[#002963] hover:text-white'}`}
        aria-label="Próxima página"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${currentPage === totalPages ? 
          'text-gray-400 cursor-not-allowed' : 
          'text-[#002963] hover:bg-[#002963] hover:text-white'}`}
        aria-label="Última página"
      >
        <i className="bi bi-chevron-double-right"></i>
      </button>
    </div>
  );
};

export default Paginator;