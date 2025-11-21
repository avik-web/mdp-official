import React from 'react';

const Badge = ({ 
  children, 
  variant = "default", 
  size = "md" 
}: { 
  children: React.ReactNode; 
  variant?: "default" | "primary" | "success" | "info";
  size?: "sm" | "md" | "lg";
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-black text-white border-black",
    success: "bg-green-100 text-green-800 border-green-200",
    info: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium border transition-colors duration-200 ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};
export default Badge;