import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      // Always show first, last, and around current
      if (currentPage < 3) {
        for (let i = 0; i < 4; i++) pages.push(i);
        pages.push(-1); // Separator
        pages.push(totalPages - 1);
      } else if (currentPage > totalPages - 4) {
        pages.push(0);
        pages.push(-1);
        for (let i = totalPages - 4; i < totalPages; i++) pages.push(i);
      } else {
        pages.push(0);
        pages.push(-1);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(-1);
        pages.push(totalPages - 1);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-12 font-display">
      <button
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="p-2 border-2 border-black bg-white hover:bg-yellow-300 disabled:opacity-50 disabled:hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, idx) => (
          page === -1 ? (
            <span key={`sep-${idx}`} className="px-2 py-2 text-xl">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-10 h-10 flex items-center justify-center border-2 border-black text-xl transition-all",
                currentPage === page 
                  ? "bg-black text-yellow-400 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,230,0,1)]" 
                  : "bg-white hover:bg-yellow-100"
              )}
            >
              {page + 1}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className="p-2 border-2 border-black bg-white hover:bg-yellow-300 disabled:opacity-50 disabled:hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
        aria-label="Next page"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
