import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const CollapsibleSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  count
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-900 text-white rounded-lg group-hover:bg-black transition-colors duration-200">
            <Icon className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {count !== undefined && (
            <span className="bg-gray-900 text-white px-2.5 py-1 rounded-full text-sm font-medium min-w-[24px] text-center">
              {count}
            </span>
          )}
        </div>
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0 border-t border-gray-100">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </section>
  );
};

export default CollapsibleSection;