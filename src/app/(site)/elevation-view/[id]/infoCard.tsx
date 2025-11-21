import React from 'react';

const InfoCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  gradient = false
}: {
  icon: string | React.ElementType;
  title: string;
  value: string;
  subtitle?: string;
  color?: string;
  gradient?: boolean;
}) => (
  <div
    className={`p-4 rounded-2xl transition-all duration-300 flex flex-row items-center gap-3 border border-gray-100 ${
      gradient ? `bg-gradient-to-br ${color || 'from-blue-500 to-purple-600'}` : 'bg-white hover:shadow-md'
    }`}
  >
    {/* Icon */}
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        gradient ? "bg-white/20" : "bg-gray-100"
      }`}
    >
      <Icon className={`w-5 h-5 ${gradient ? "text-white" : "text-gray-700"}`} />
    </div>

    {/* Content */}
    <div className="flex flex-col text-left">
      <div className={`text-sm font-bold ${gradient ? "text-white" : "text-gray-900"}`}>
        {value}
      </div>
      <div className={`text-xs font-medium ${gradient ? "text-gray-300" : "text-gray-500"}`}>
        {title}
      </div>
      {subtitle && (
        <div className={`text-xs ${gradient ? "text-gray-400" : "text-gray-400"}`}>
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

export default InfoCard;