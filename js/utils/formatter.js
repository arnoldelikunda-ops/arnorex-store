/* =========================================
   ARNOREX FORMATTERS
========================================= */

/* =========================================
   FORMAT CURRENCY
========================================= */

export const formatCurrency = (
  amount = 0,
  currency = 'USD'
) => {

  try {

    return new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency
      }
    ).format(amount);

  } catch (error) {

    console.error(
      'Currency Format Error:',
      error
    );

    return `$${amount}`;

  }

};

/* =========================================
   FORMAT NUMBER
========================================= */

export const formatNumber = (
  value = 0
) => {

  return new Intl.NumberFormat(
    'en-US'
  ).format(value);

};

/* =========================================
   FORMAT LARGE NUMBERS
========================================= */

export const formatCompactNumber = (
  value = 0
) => {

  return new Intl.NumberFormat(
    'en-US',
    {
      notation: 'compact',
      compactDisplay: 'short'
    }
  ).format(value);

};

/* =========================================
   FORMAT PERCENTAGE
========================================= */

export const formatPercentage = (
  value = 0
) => {

  return `${value}%`;

};

/* =========================================
   FORMAT RATING
========================================= */

export const formatRating = (
  rating = 0
) => {

  return Number(rating)
    .toFixed(1);

};

/* =========================================
   FORMAT DATE
========================================= */

export const formatDate = (
  date
) => {

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ).format(
    new Date(date)
  );

};

/* =========================================
   FORMAT TIME
========================================= */

export const formatTime = (
  date
) => {

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(
    new Date(date)
  );

};

/* =========================================
   FORMAT DATE & TIME
========================================= */

export const formatDateTime = (
  date
) => {

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(
    new Date(date)
  );

};

/* =========================================
   FORMAT STOCK STATUS
========================================= */

export const formatStock = (
  stock = 0
) => {

  if (stock <= 0) {
    return 'Out of Stock';
  }

  if (stock <= 5) {
    return 'Low Stock';
  }

  return 'In Stock';

};

/* =========================================
   FORMAT DISCOUNT
========================================= */

export const calculateDiscount = (
  oldPrice = 0,
  newPrice = 0
) => {

  if (
    !oldPrice ||
    !newPrice
  ) {
    return 0;
  }

  return Math.round(
    (
      (
        oldPrice - newPrice
      ) / oldPrice
    ) * 100
  );

};

/* =========================================
   FORMAT INITIALS
========================================= */

export const formatInitials = (
  name = ''
) => {

  return name
    .split(' ')
    .map(word =>
      word[0]
    )
    .join('')
    .toUpperCase();

};

/* =========================================
   FORMAT TEXT LIMIT
========================================= */

export const truncateText = (
  text = '',
  limit = 80
) => {

  if (
    text.length <= limit
  ) {
    return text;
  }

  return `
    ${text.slice(0, limit)}...
  `;

};

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {

  formatCurrency,

  formatNumber,

  formatCompactNumber,

  formatPercentage,

  formatRating,

  formatDate,

  formatTime,

  formatDateTime,

  formatStock,

  calculateDiscount,

  formatInitials,

  truncateText

};