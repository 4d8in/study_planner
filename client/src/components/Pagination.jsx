import React from 'react';

const Pagination = ({ page, pageSize, total, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  return (
    <div className="flex items-center justify-between gap-4 mt-4 text-sm text-slate-600">
      <div>
        Page {page} / {totalPages} · {total} tâche{total > 1 ? 's' : ''}
      </div>
      <div className="flex gap-2">
        <button
          onClick={prev}
          disabled={page === 1}
          className="px-3 py-1 rounded border border-slate-200 disabled:opacity-50 hover:bg-slate-100"
        >
          Précédent
        </button>
        <button
          onClick={next}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border border-slate-200 disabled:opacity-50 hover:bg-slate-100"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Pagination;
