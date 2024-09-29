"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      // Use the current pathname instead of hardcoding '/policies'
      router.push(`${pathname}?page=${newPage}`);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        disabled={currentPage <= 1}
        className={`px-4 py-2 rounded ${
          currentPage <= 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded ${
          currentPage >= totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
