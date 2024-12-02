/**
 * Format number as currency
 */
export const formatCurrency = (value: number, options?: {
  currency?: string;
  locale?: string;
  decimals?: number;
}) => {
  const {
    currency = 'USD',
    locale = 'en-US',
    decimals = 2
  } = options ?? {};

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Format number as percentage
 */
export const formatPercentage = (value: number, options?: {
  decimals?: number;
  includeSign?: boolean;
}) => {
  const {
    decimals = 2,
    includeSign = true
  } = options ?? {};

  const formatted = value.toFixed(decimals) + '%';
  return includeSign && value > 0 ? `+${formatted}` : formatted;
};

/**
 * Format number with abbreviated suffix (K, M, B)
 */
export const formatCompact = (value: number, options?: {
  locale?: string;
  decimals?: number;
}) => {
  const {
    locale = 'en-US',
    decimals = 1
  } = options ?? {};

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Format number for FX rates
 */
export const formatRate = (value: number, decimals: number = 4) => {
  return value.toFixed(decimals);
};

/**
 * Format date/time
 */
export const formatDateTime = (date: Date, options?: {
  format?: 'date' | 'time' | 'datetime';
  locale?: string;
}) => {
  const {
    format = 'datetime',
    locale = 'en-US'
  } = options ?? {};

  const formatOptions: Intl.DateTimeFormatOptions = {
    date: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    },
    time: { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    },
    datetime: { 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  }[format];

  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
};

/**
 * Format relative time (e.g. 2 hours ago)
 */
export const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const diffSeconds = Math.round(diff / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSeconds < 60) {
    return rtf.format(-diffSeconds, 'second');
  }
  if (diffMinutes < 60) {
    return rtf.format(-diffMinutes, 'minute');
  }
  if (diffHours < 24) {
    return rtf.format(-diffHours, 'hour');
  }
  return rtf.format(-diffDays, 'day');
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (value: number, options?: {
  locale?: string;
  decimals?: number;
}) => {
  const {
    locale = 'en-US',
    decimals = 0
  } = options ?? {};

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};
