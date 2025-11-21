import React, { useEffect } from "react";

interface CustomTabsProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

const CustomTabs = ({ options, value, onChange, className = "" }: CustomTabsProps) => {
  // Auto-select first option if no value
  useEffect(() => {
    if (!value && options.length > 0) {
      onChange(options[0]);
    }
  }, [value, options, onChange]);

  return (
    <div className={`flex space-x-2 border-b ${className}`}>
      {options.map((option) => {
        const isActive = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`flex-1 px-4 py-2 rounded-t-lg capitalize transition-colors duration-200 ${
              isActive
                ? "text-gray-900 border-b-2 border-primary font-semibold"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default CustomTabs;
