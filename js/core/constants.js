/* =========================================
   ARNOREX GLOBAL CONSTANTS
   Marketplace Core Configuration
========================================= */

/* =========================================
   APP INFORMATION
========================================= */

export const APP = {
  NAME: 'Arnorex e-Market',

  SHORT_NAME: 'Arnorex',

  VERSION: '1.0.0',

  AUTHOR: 'Arnorex',

  DESCRIPTION:
    'Premium African Marketplace Ecosystem',

  CURRENCY: 'USD',

  CURRENCY_SYMBOL: '$',

  DEFAULT_LANGUAGE: 'en',

  SUPPORT_EMAIL:
    'support@arnorex.com',

  MAX_CART_ITEMS: 99,

  FREE_SHIPPING_LIMIT: 100,

  TAX_PERCENTAGE: 18
};

/* =========================================
   ROUTES
========================================= */

export const ROUTES = {
  HOME: '/',

  PRODUCT: '/product.html',

  CART: '/cart.html',

  CHECKOUT: '/checkout.html',

  FAVORITES: '/favorites.html',

  PROFILE: '/profile.html',

  SETTINGS: '/settings.html',

  ORDERS: '/orders.html',

  SUPPORT: '/support.html',

  NOTIFICATIONS: '/notifications.html',

  ADMIN: '/admin.html'
};

/* =========================================
   LOCAL STORAGE KEYS
========================================= */

export const STORAGE_KEYS = {
  USER: 'arnorex_user',

  CART: 'arnorex_cart',

  FAVORITES: 'arnorex_favorites',

  SETTINGS: 'arnorex_settings',

  TOKEN: 'arnorex_token',

  THEME: 'arnorex_theme',

  RECENTLY_VIEWED:
    'arnorex_recently_viewed',

  SEARCH_HISTORY:
    'arnorex_search_history'
};

/* =========================================
   THEMES
========================================= */

export const THEMES = {
  DARK: 'dark',

  GOLD: 'gold',

  PREMIUM: 'premium'
};

/* =========================================
   ORDER STATUS
========================================= */

export const ORDER_STATUS = {
  PENDING: 'pending',

  PROCESSING: 'processing',

  SHIPPED: 'shipped',

  DELIVERED: 'delivered',

  CANCELLED: 'cancelled'
};

/* =========================================
   PRODUCT CATEGORIES
========================================= */

export const PRODUCT_CATEGORIES = [
  'Fashion',
  'Electronics',
  'Accessories',
  'Beauty',
  'Luxury',
  'Home',
  'Gaming',
  'Sports',
  'Automotive',
  'Health',
  'Phones',
  'Computers'
];

/* =========================================
   MARKETPLACE TAGS
========================================= */

export const PRODUCT_TAGS = [
  'Trending',
  'Best Seller',
  'New Arrival',
  'Premium',
  'Luxury',
  'Featured',
  'Verified'
];

/* =========================================
   ANIMATION DURATIONS
========================================= */

export const ANIMATION = {
  FAST: 180,

  NORMAL: 320,

  SLOW: 600,

  CINEMATIC: 1200
};

/* =========================================
   API CONFIGURATION
========================================= */

export const API = {
  PRODUCTS_LIMIT: 20,

  SEARCH_LIMIT: 12,

  RECOMMENDATIONS_LIMIT: 8,

  REQUEST_TIMEOUT: 10000
};

/* =========================================
   UI BREAKPOINTS
========================================= */

export const BREAKPOINTS = {
  MOBILE: 540,

  TABLET: 768,

  LAPTOP: 992,

  DESKTOP: 1200
};

/* =========================================
   NOTIFICATION TYPES
========================================= */

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',

  ERROR: 'error',

  WARNING: 'warning',

  INFO: 'info'
};

/* =========================================
   PAYMENT METHODS
========================================= */

export const PAYMENT_METHODS = [
  'Credit Card',
  'Debit Card',
  'PayPal',
  'M-Pesa',
  'Bank Transfer',
  'Cash On Delivery'
];

/* =========================================
   DEFAULT USER SETTINGS
========================================= */

export const DEFAULT_SETTINGS = {
  theme: THEMES.PREMIUM,

  notifications: true,

  language: 'en',

  currency: 'USD',

  autoplayVideos: true
};

/* =========================================
   PLACEHOLDER IMAGES
========================================= */

export const PLACEHOLDERS = {
  PRODUCT:
    './assets/placeholders/product-placeholder.png',

  USER:
    './assets/placeholders/user-placeholder.png',

  BANNER:
    './assets/placeholders/banner-placeholder.jpg'
};

/* =========================================
   ICONS
========================================= */

export const ICONS = {
  CART: '🛒',

  FAVORITE: '❤',

  SEARCH: '🔍',

  USER: '👤',

  NOTIFICATION: '🔔',

  STAR: '⭐'
};

/* =========================================
   REGEX VALIDATION
========================================= */

export const REGEX = {
  EMAIL:
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  PASSWORD:
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

  PHONE:
    /^[0-9]{10,15}$/
};

/* =========================================
   FIREBASE COLLECTIONS
========================================= */

export const COLLECTIONS = {
  USERS: 'users',

  PRODUCTS: 'products',

  ORDERS: 'orders',

  REVIEWS: 'reviews',

  NOTIFICATIONS: 'notifications'
};

/* =========================================
   PERFORMANCE SETTINGS
========================================= */

export const PERFORMANCE = {
  IMAGE_LAZY_LOADING: true,

  ENABLE_CACHE: true,

  ENABLE_ANIMATIONS: true
};

/* =========================================
   SECURITY SETTINGS
========================================= */

export const SECURITY = {
  MIN_PASSWORD_LENGTH: 8,

  MAX_LOGIN_ATTEMPTS: 5
};

/* =========================================
   DEFAULT EXPORT
========================================= */

export default {
  APP,
  ROUTES,
  STORAGE_KEYS,
  THEMES,
  ORDER_STATUS,
  PRODUCT_CATEGORIES,
  PRODUCT_TAGS,
  ANIMATION,
  API,
  BREAKPOINTS,
  NOTIFICATION_TYPES,
  PAYMENT_METHODS,
  DEFAULT_SETTINGS,
  PLACEHOLDERS,
  ICONS,
  REGEX,
  COLLECTIONS,
  PERFORMANCE,
  SECURITY
};
