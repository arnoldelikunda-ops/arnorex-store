/* =========================================
   ARNOREX HOME PAGE ENGINE
   Dynamic Marketplace Homepage
========================================= */

import {
  APP
} from '../core/constants.js';

import {
  setPageTitle
} from '../core/app.js';

import {
  loadProductsIntoUI,
  getCategories,
  searchProducts,
  renderProducts,
  fetchProducts
} from '../modules/products/products.js';

import {
  debounce
} from '../utils/helpers.js';

/* =========================================
   HOME PAGE INITIALIZER
========================================= */

export const initializeHomePage =
  async () => {

  try {

    /* PAGE TITLE */

    setPageTitle(
      `Home • ${APP.NAME}`
    );

    /* HERO */

    initializeHero();

    /* LOAD DATA */

    await fetchProducts();

    /* LOAD SECTIONS */

    await Promise.all([

      loadFeaturedProducts(),

      loadTrendingProducts(),

      loadFlashSaleProducts(),

      loadBestSellerProducts()

    ]);

    /* CATEGORY NAVIGATION */

    renderCategoryNavigation();

    /* SEARCH */

    initializeSearch();

    /* SLIDERS */

    initializeHorizontalScrolls();

    /* ANNOUNCEMENTS */

    initializeAnnouncements();

    console.log(
      'Homepage initialized'
    );

  } catch (error) {

    console.error(
      'Homepage Initialization Error:',
      error
    );

  }

};

/* =========================================
   HERO SECTION
========================================= */

export const initializeHero = () => {

  const heroTitle =
    document.querySelector(
      '.hero-title'
    );

  if (!heroTitle) {
    return;
  }

  const messages = [

    'Luxury Marketplace Experience',

    'Premium Global Shopping',

    'Discover Trending Products',

    'Elite Deals & Flash Sales'

  ];

  let current = 0;

  setInterval(() => {

    current =
      (current + 1)
      % messages.length;

    heroTitle.classList.add(
      'fade-switch'
    );

    setTimeout(() => {

      heroTitle.textContent =
        messages[current];

      heroTitle.classList.remove(
        'fade-switch'
      );

    }, 300);

  }, 5000);

};

/* =========================================
   FEATURED PRODUCTS
========================================= */

export const loadFeaturedProducts =
  async () => {

  await loadProductsIntoUI({

    container:
      '#featured-products',

    type: 'featured',

    limit: 8

  });

};

/* =========================================
   TRENDING PRODUCTS
========================================= */

export const loadTrendingProducts =
  async () => {

  await loadProductsIntoUI({

    container:
      '#trending-products',

    type: 'trending',

    limit: 8

  });

};

/* =========================================
   FLASH SALE PRODUCTS
========================================= */

export const loadFlashSaleProducts =
  async () => {

  await loadProductsIntoUI({

    container:
      '#flash-sale-products',

    type: 'flash-sale',

    limit: 6

  });

};

/* =========================================
   BEST SELLERS
========================================= */

export const loadBestSellerProducts =
  async () => {

  await loadProductsIntoUI({

    container:
      '#best-seller-products',

    type: 'best-sellers',

    limit: 8

  });

};

/* =========================================
   CATEGORY NAVIGATION
========================================= */

export const renderCategoryNavigation =
  () => {

  const container =
    document.querySelector(
      '#category-navigation'
    );

  if (!container) {
    return;
  }

  const categories =
    getCategories();

  container.innerHTML =
    categories
      .map(category => `
        <button
          class="
            category-chip
          "
          data-category="${category}"
        >
          ${category}
        </button>
      `)
      .join('');

  container
    .querySelectorAll(
      '.category-chip'
    )
    .forEach(button => {

      button.addEventListener(
        'click',
        async () => {

          const category =
            button.dataset.category;

          container
            .querySelectorAll(
              '.category-chip'
            )
            .forEach(chip => {

              chip.classList.remove(
                'active'
              );

            });

          button.classList.add(
            'active'
          );

          if (
            category === 'All'
          ) {

            await loadFeaturedProducts();

            return;
          }

          const products =
            searchProducts(
              category
            );

          renderProducts({

            container:
              '#featured-products',

            products

          });

        }
      );

    });

};

/* =========================================
   SEARCH SYSTEM
========================================= */

export const initializeSearch =
  () => {

  const input =
    document.querySelector(
      '#home-search-input'
    );

  if (!input) {
    return;
  }

  const handleSearch =
    debounce(event => {

      const keyword =
        event.target.value;

      const results =
        searchProducts(
          keyword
        );

      renderProducts({

        container:
          '#featured-products',

        products: results

      });

    }, 350);

  input.addEventListener(
    'input',
    handleSearch
  );

};

/* =========================================
   HORIZONTAL SCROLLS
========================================= */

export const initializeHorizontalScrolls =
  () => {

  const wrappers =
    document.querySelectorAll(
      '.horizontal-products'
    );

  wrappers.forEach(wrapper => {

    let isDown = false;

    let startX;

    let scrollLeft;

    wrapper.addEventListener(
      'mousedown',
      e => {

        isDown = true;

        startX =
          e.pageX -
          wrapper.offsetLeft;

        scrollLeft =
          wrapper.scrollLeft;

      }
    );

    wrapper.addEventListener(
      'mouseleave',
      () => {

        isDown = false;

      }
    );

    wrapper.addEventListener(
      'mouseup',
      () => {

        isDown = false;

      }
    );

    wrapper.addEventListener(
      'mousemove',
      e => {

        if (!isDown) {
          return;
        }

        e.preventDefault();

        const x =
          e.pageX -
          wrapper.offsetLeft;

        const walk =
          (x - startX) * 1.5;

        wrapper.scrollLeft =
          scrollLeft - walk;

      }
    );

  });

};

/* =========================================
   ANNOUNCEMENTS
========================================= */

export const initializeAnnouncements =
  () => {

  const announcement =
    document.querySelector(
      '.announcement-text'
    );

  if (!announcement) {
    return;
  }

  const announcements = [

    '🚀 Free global shipping on selected products',

    '🔥 Flash Sale ending in 4 hours',

    '💎 Premium members enjoy exclusive discounts',

    '⚡ New arrivals updated daily'

  ];

  let current = 0;

  setInterval(() => {

    current =
      (current + 1)
      % announcements.length;

    announcement.classList.add(
      'fade-switch'
    );

    setTimeout(() => {

      announcement.textContent =
        announcements[current];

      announcement.classList.remove(
        'fade-switch'
      );

    }, 300);

  }, 4000);

};

/* =========================================
   AUTO INITIALIZATION
========================================= */

document.addEventListener(
  'DOMContentLoaded',
  initializeHomePage
);

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {
  initializeHomePage,

  loadFeaturedProducts,

  loadTrendingProducts,

  loadFlashSaleProducts,

  loadBestSellerProducts,

  renderCategoryNavigation,

  initializeSearch,

  initializeHero,

  initializeAnnouncements
};
