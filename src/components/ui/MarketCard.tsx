import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

const MarketCard: React.FC<MarketCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  subtitle,
  icon,
  isLoading = false,
  className = '',
  onClick,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-accent-green';
      case 'down':
        return 'text-accent-orange';
      default:
        return 'text-text-secondary';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      onClick={onClick}
      className={`
        glass-morphism p-6 rounded-lg cursor-pointer
        hover:shadow-glass-hover transition-all duration-300
        ${className}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm text-text-secondary">{title}</h3>
          <div className={`mt-2 text-2xl font-bold ${isLoading ? 'animate-pulse-subtle' : ''}`}>
            {isLoading ? 'Loading...' : value}
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          )}
          {typeof change !== 'undefined' && (
            <div className={`mt-2 flex items-center ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="ml-1 text-sm">
                {change > 0 ? '+' : ''}{change.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-background-secondary rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MarketCard;