/* =========================================
   ARNOREX PRODUCTS ENGINE
   Marketplace Product Service Layer
========================================= */

import {
  APP
} from '../../core/constants.js';

import {
  setProducts,
  setLoading
} from '../../core/state.js';

import {
  renderProductGrid,
  renderEmptyProducts,
  renderProductSkeletons
} from './product-card.js';

/* =========================================
   LOCAL CACHE
========================================= */

let productsCache = [];

/* =========================================
   FETCH PRODUCTS
========================================= */

export const fetchProducts = async () => {

  try {

    setLoading(true);

    const response =
      await fetch(
        './data/demo-products.json'
      );

    if (!response.ok) {

      throw new Error(
        'Failed to fetch products'
      );

    }

    const products =
      await response.json();

    productsCache = products;

    setProducts(products);

    window.demoProducts =
      products;

    return products;

  } catch (error) {

    console.error(
      'Products Fetch Error:',
      error
    );

    return [];

  } finally {

    setLoading(false);

  }

};

/* =========================================
   GET ALL PRODUCTS
========================================= */

export const getAllProducts = () => {

  return productsCache;

};

/* =========================================
   GET PRODUCT BY ID
========================================= */

export const getProductById = (
  id
) => {

  return productsCache.find(
    product =>
      String(product.id) ===
      String(id)
  );

};

/* =========================================
   GET FEATURED PRODUCTS
========================================= */

export const getFeaturedProducts = (
  limit = APP.FEATURED_PRODUCTS_LIMIT
) => {

  return productsCache
    .filter(
      product =>
        product.featured
    )
    .slice(0, limit);

};

/* =========================================
   GET PRODUCTS BY CATEGORY
========================================= */

export const getProductsByCategory = (
  category
) => {

  if (!category) {
    return productsCache;
  }

  return productsCache.filter(
    product =>
      product.category
        .toLowerCase()
        .includes(
          category.toLowerCase()
        )
  );

};

/* =========================================
   SEARCH PRODUCTS
========================================= */

export const searchProducts = (
  query = ''
) => {

  if (!query.trim()) {
    return productsCache;
  }

  const keyword =
    query.toLowerCase();

  return productsCache.filter(
    product => {

      return (
        product.name
          .toLowerCase()
          .includes(keyword)

        ||

        product.category
          .toLowerCase()
          .includes(keyword)

        ||

        product.vendor
          .toLowerCase()
          .includes(keyword)
      );

    }
  );

};

/* =========================================
   FILTER PRODUCTS
========================================= */

export const filterProducts = ({
  category = null,
  minPrice = 0,
  maxPrice = Infinity,
  featured = false,
  inStock = false
} = {}) => {

  return productsCache.filter(
    product => {

      /* CATEGORY */

      if (
        category &&
        product.category !== category
      ) {
        return false;
      }

      /* PRICE */

      if (
        product.price < minPrice ||
        product.price > maxPrice
      ) {
        return false;
      }

      /* FEATURED */

      if (
        featured &&
        !product.featured
      ) {
        return false;
      }

      /* STOCK */

      if (
        inStock &&
        product.stock <= 0
      ) {
        return false;
      }

      return true;

    }
  );

};

/* =========================================
   SORT PRODUCTS
========================================= */

export const sortProducts = (
  products = [],
  sortBy = 'default'
) => {

  const sorted =
    [...products];

  switch (sortBy) {

    case 'price-low':

      return sorted.sort(
        (a, b) =>
          a.price - b.price
      );

    case 'price-high':

      return sorted.sort(
        (a, b) =>
          b.price - a.price
      );

    case 'rating':

      return sorted.sort(
        (a, b) =>
          b.rating - a.rating
      );

    case 'reviews':

      return sorted.sort(
        (a, b) =>
          b.reviews - a.reviews
      );

    case 'latest':

      return sorted.reverse();

    case 'featured':

      return sorted.sort(
        (a, b) =>
          Number(b.featured) -
          Number(a.featured)
      );

    default:

      return sorted;

  }

};

/* =========================================
   GET PRODUCT CATEGORIES
========================================= */

export const getCategories = () => {

  const categories =
    productsCache.map(
      product =>
        product.category
    );

  return [
    'All',
    ...new Set(categories)
  ];

};

/* =========================================
   GET RELATED PRODUCTS
========================================= */

export const getRelatedProducts = (
  productId,
  limit = 4
) => {

  const product =
    getProductById(productId);

  if (!product) {
    return [];
  }

  return productsCache
    .filter(item => {

      return (
        item.category ===
        product.category

        &&

        item.id !== product.id
      );

    })
    .slice(0, limit);

};

/* =========================================
   GET TRENDING PRODUCTS
========================================= */

export const getTrendingProducts = (
  limit = 6
) => {

  return [...productsCache]
    .sort(
      (a, b) =>
        b.reviews - a.reviews
    )
    .slice(0, limit);

};

/* =========================================
   GET BEST SELLERS
========================================= */

export const getBestSellers = (
  limit = 6
) => {

  return [...productsCache]
    .sort(
      (a, b) =>
        b.rating - a.rating
    )
    .slice(0, limit);

};

/* =========================================
   GET FLASH SALE PRODUCTS
========================================= */

export const getFlashSaleProducts = (
  limit = 4
) => {

  return [...productsCache]
    .sort((a, b) => {

      const discountA =
        a.oldPrice
          ? (
              (
                a.oldPrice -
                a.price
              ) / a.oldPrice
            )
          : 0;

      const discountB =
        b.oldPrice
          ? (
              (
                b.oldPrice -
                b.price
              ) / b.oldPrice
            )
          : 0;

      return (
        discountB -
        discountA
      );

    })
    .slice(0, limit);

};

/* =========================================
   RENDER PRODUCTS
========================================= */

export const renderProducts = ({
  container,
  products = []
}) => {

  if (!products.length) {

    renderEmptyProducts(
      container
    );

    return;
  }

  renderProductGrid({
    container,
    products
  });

};

/* =========================================
   LOAD PRODUCTS INTO UI
========================================= */

export const loadProductsIntoUI = async ({
  container,
  type = 'all',
  limit = null
}) => {

  const target =
    typeof container === 'string'
      ? document.querySelector(
          container
        )
      : container;

  if (!target) {
    return;
  }

  renderProductSkeletons(
    target
  );

  await fetchProducts();

  let products = [];

  switch (type) {

    case 'featured':

      products =
        getFeaturedProducts(
          limit || 8
        );

      break;

    case 'trending':

      products =
        getTrendingProducts(
          limit || 8
        );

      break;

    case 'best-sellers':

      products =
        getBestSellers(
          limit || 8
        );

      break;

    case 'flash-sale':

      products =
        getFlashSaleProducts(
          limit || 8
        );

      break;

    default:

      products =
        limit
          ? getAllProducts()
              .slice(0, limit)
          : getAllProducts();

  }

  renderProducts({
    container: target,
    products
  });

};

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {

  fetchProducts,

  getAllProducts,

  getProductById,

  getFeaturedProducts,

  getProductsByCategory,

  searchProducts,

  filterProducts,

  sortProducts,

  getCategories,

  getRelatedProducts,

  getTrendingProducts,

  getBestSellers,

  getFlashSaleProducts,

  renderProducts,

  loadProductsIntoUI

};
