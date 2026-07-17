'use client';

import React from 'react';

interface CategoryNavProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none pb-2 flex gap-2 border-b border-slate-100">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all border cursor-pointer ${
          selectedCategory === null
            ? 'bg-teal-700 text-white border-teal-700'
            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all border cursor-pointer ${
            selectedCategory === cat
              ? 'bg-teal-700 text-white border-teal-700'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;
