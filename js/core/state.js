/* =========================================
   ARNOREX GLOBAL STATE SYSTEM
   Marketplace State Engine
========================================= */

import {
  STORAGE_KEYS,
  DEFAULT_SETTINGS
} from './constants.js';

/* =========================================
   STORAGE HELPERS
========================================= */

const getStorage = (key, fallback) => {
  try {
    const data =
      localStorage.getItem(key);

    return data
      ? JSON.parse(data)
      : fallback;

  } catch (error) {

    console.error(
      `Storage read error: ${key}`,
      error
    );

    return fallback;
  }
};

const setStorage = (key, value) => {
  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  } catch (error) {

    console.error(
      `Storage write error: ${key}`,
      error
    );
  }
};

/* =========================================
   INITIAL GLOBAL STATE
========================================= */

const state = {

  /* USER */

  user:
    getStorage(
      STORAGE_KEYS.USER,
      null
    ),

  token:
    getStorage(
      STORAGE_KEYS.TOKEN,
      null
    ),

  /* CART */

  cart:
    getStorage(
      STORAGE_KEYS.CART,
      []
    ),

  /* FAVORITES */

  favorites:
    getStorage(
      STORAGE_KEYS.FAVORITES,
      []
    ),

  /* SETTINGS */

  settings:
    getStorage(
      STORAGE_KEYS.SETTINGS,
      DEFAULT_SETTINGS
    ),

  /* NOTIFICATIONS */

  notifications: [],

  /* SEARCH */

  searchHistory:
    getStorage(
      STORAGE_KEYS.SEARCH_HISTORY,
      []
    ),

  /* PRODUCTS */

  recentlyViewed:
    getStorage(
      STORAGE_KEYS.RECENTLY_VIEWED,
      []
    ),

  /* UI */

  isSidebarOpen: false,

  isLoading: false,

  activeModal: null
};

/* =========================================
   SUBSCRIBERS
========================================= */

const listeners = [];

/* =========================================
   GET STATE
========================================= */

export const getState = () => {
  return structuredClone(state);
};

/* =========================================
   SUBSCRIBE
========================================= */

export const subscribe = (callback) => {

  if (typeof callback !== 'function') {
    return;
  }

  listeners.push(callback);
};

/* =========================================
   NOTIFY LISTENERS
========================================= */

const notify = () => {

  const snapshot =
    getState();

  listeners.forEach(listener => {

    try {

      listener(snapshot);

    } catch (error) {

      console.error(
        'State listener error:',
        error
      );

    }

  });

};

/* =========================================
   UPDATE STATE
========================================= */

export const setState = (updates = {}) => {

  Object.assign(state, updates);

  notify();
};

/* =========================================
   RESET STATE
========================================= */

export const resetState = () => {

  state.user = null;

  state.token = null;

  state.cart = [];

  state.favorites = [];

  state.notifications = [];

  state.searchHistory = [];

  state.recentlyViewed = [];

  notify();
};

/* =========================================
   USER METHODS
========================================= */

export const setUser = (userData) => {

  state.user = userData;

  setStorage(
    STORAGE_KEYS.USER,
    userData
  );

  notify();
};

export const logoutUser = () => {

  state.user = null;

  state.token = null;

  localStorage.removeItem(
    STORAGE_KEYS.USER
  );

  localStorage.removeItem(
    STORAGE_KEYS.TOKEN
  );

  notify();
};

/* =========================================
   TOKEN METHODS
========================================= */

export const setToken = (token) => {

  state.token = token;

  setStorage(
    STORAGE_KEYS.TOKEN,
    token
  );

  notify();
};

/* =========================================
   CART METHODS
========================================= */

export const addToCart = (product) => {

  if (!product?.id) {
    return;
  }

  const existing =
    state.cart.find(
      item => item.id === product.id
    );

  if (existing) {

    existing.quantity += 1;

  } else {

    state.cart.push({
      ...product,
      quantity: 1
    });

  }

  setStorage(
    STORAGE_KEYS.CART,
    state.cart
  );

  notify();
};

export const removeFromCart = (productId) => {

  state.cart =
    state.cart.filter(
      item => item.id !== productId
    );

  setStorage(
    STORAGE_KEYS.CART,
    state.cart
  );

  notify();
};

export const clearCart = () => {

  state.cart = [];

  setStorage(
    STORAGE_KEYS.CART,
    state.cart
  );

  notify();
};

export const updateCartQuantity = (
  productId,
  quantity
) => {

  const item =
    state.cart.find(
      item => item.id === productId
    );

  if (!item) {
    return;
  }

  item.quantity = quantity;

  if (item.quantity <= 0) {

    removeFromCart(productId);

    return;
  }

  setStorage(
    STORAGE_KEYS.CART,
    state.cart
  );

  notify();
};

export const getCartTotal = () => {

  return state.cart.reduce(
    (total, item) =>
      total + (
        item.price * item.quantity
      ),
    0
  );
};

export const getCartCount = () => {

  return state.cart.reduce(
    (count, item) =>
      count + item.quantity,
    0
  );
};

/* =========================================
   FAVORITES METHODS
========================================= */

export const toggleFavorite = (product) => {

  const exists =
    state.favorites.find(
      item => item.id === product.id
    );

  if (exists) {

    state.favorites =
      state.favorites.filter(
        item => item.id !== product.id
      );

  } else {

    state.favorites.push(product);

  }

  setStorage(
    STORAGE_KEYS.FAVORITES,
    state.favorites
  );

  notify();
};

export const isFavorite = (productId) => {

  return state.favorites.some(
    item => item.id === productId
  );
};

/* =========================================
   RECENTLY VIEWED
========================================= */

export const addRecentlyViewed = (
  product
) => {

  state.recentlyViewed =
    state.recentlyViewed.filter(
      item => item.id !== product.id
    );

  state.recentlyViewed.unshift(product);

  state.recentlyViewed =
    state.recentlyViewed.slice(0, 12);

  setStorage(
    STORAGE_KEYS.RECENTLY_VIEWED,
    state.recentlyViewed
  );

  notify();
};

/* =========================================
   SEARCH HISTORY
========================================= */

export const addSearchHistory = (
  query
) => {

  if (!query?.trim()) {
    return;
  }

  state.searchHistory =
    state.searchHistory.filter(
      item =>
        item.toLowerCase() !==
        query.toLowerCase()
    );

  state.searchHistory.unshift(query);

  state.searchHistory =
    state.searchHistory.slice(0, 10);

  setStorage(
    STORAGE_KEYS.SEARCH_HISTORY,
    state.searchHistory
  );

  notify();
};

/* =========================================
   NOTIFICATIONS
========================================= */

export const addNotification = ({
  type = 'info',
  message = ''
}) => {

  const notification = {
    id: crypto.randomUUID(),

    type,

    message,

    createdAt:
      new Date().toISOString()
  };

  state.notifications.unshift(
    notification
  );

  notify();

  setTimeout(() => {

    removeNotification(
      notification.id
    );

  }, 5000);
};

export const removeNotification = (
  notificationId
) => {

  state.notifications =
    state.notifications.filter(
      item =>
        item.id !== notificationId
    );

  notify();
};

/* =========================================
   UI METHODS
========================================= */

export const setLoading = (value) => {

  state.isLoading = value;

  notify();
};

export const toggleSidebar = () => {

  state.isSidebarOpen =
    !state.isSidebarOpen;

  notify();
};

export const openModal = (
  modalName
) => {

  state.activeModal =
    modalName;

  notify();
};

export const closeModal = () => {

  state.activeModal = null;

  notify();
};

/* =========================================
   SETTINGS METHODS
========================================= */

export const updateSettings = (
  updates
) => {

  state.settings = {
    ...state.settings,
    ...updates
  };

  setStorage(
    STORAGE_KEYS.SETTINGS,
    state.settings
  );

  notify();
};

/* =========================================
   INITIALIZE STATE
========================================= */

export const initializeState = () => {

  document.documentElement.setAttribute(
    'data-theme',
    state.settings.theme
  );

  notify();
};

/* =========================================
   DEFAULT EXPORT
========================================= */

export default {
  getState,
  setState,
  subscribe,

  setUser,
  logoutUser,
  setToken,

  addToCart,
  removeFromCart,
  clearCart,
  updateCartQuantity,
  getCartTotal,
  getCartCount,

  toggleFavorite,
  isFavorite,

  addRecentlyViewed,
  addSearchHistory,

  addNotification,
  removeNotification,

  setLoading,
  toggleSidebar,
  openModal,
  closeModal,

  updateSettings,

  initializeState,

  resetState
};