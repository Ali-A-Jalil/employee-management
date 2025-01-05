import React, { useCallback } from "react";

const Pagination = React.memo(
  ({ currentPage, totalPages, onNext, onPrevious, onPageChange }) => {
    const generatePageNumbers = useCallback(() => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }, [totalPages]);

    const handlePageChange = useCallback(
      (page) => {
        onPageChange(page);
      },
      [onPageChange]
    );

    return (
      <div className="flex items-center justify-between mt-6">
        {/* زر Previous */}
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100"
        >
          Previous
        </button>

        {/* أرقام الصفحات */}
        <div className="flex space-x-2">
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* زر Next */}
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    );
  }
);

export default Pagination;
