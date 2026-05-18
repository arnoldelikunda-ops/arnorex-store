/* =========================================
   ARNOREX PRODUCT CARD ENGINE
   Marketplace Product Renderer
========================================= */

import {
  formatPrice,
  truncateText
} from '../../utils/helpers.js';

import {
  addToCart,
  toggleFavorite,
  isFavorite,
  addRecentlyViewed
} from '../../core/state.js';

import {
  showNotification
} from '../../core/app.js';

/* =========================================
   CREATE PRODUCT CARD
========================================= */

export const createProductCard = (
  product = {}
) => {

  const {
    id,
    name,
    image,
    price,
    oldPrice,
    rating,
    reviews,
    badge,
    category,
    stock,
    vendor,
    featured
  } = product;

  const favorite =
    isFavorite(id);

  const discount =
    calculateDiscount(
      oldPrice,
      price
    );

  return `
    <article
      class="
        product-card
        glass
        hover-lift
        animate-fade-up
        ${featured ? 'featured-product' : ''}
      "
      data-product-id="${id}"
    >

      <!-- IMAGE -->

      <div class="product-image-wrapper">

        <a
          href="product.html?id=${id}"
          class="product-image-link"
        >

          <img
            src="${image}"
            alt="${name}"
            class="product-image"
            loading="lazy"
          />

        </a>

        <!-- BADGES -->

        <div class="product-badges">

          ${
            badge
              ? `
            <span class="badge badge-gold">
              ${badge}
            </span>
          `
              : ''
          }

          ${
            discount > 0
              ? `
            <span class="badge badge-red">
              -${discount}%
            </span>
          `
              : ''
          }

        </div>

        <!-- QUICK ACTIONS -->

        <div class="product-actions">

          <button
            class="
              product-favorite-btn
              ${favorite ? 'active' : ''}
            "
            data-product-id="${id}"
            aria-label="Favorite Product"
          >
            ❤
          </button>

          <button
            class="
              product-action-btn
              add-cart-btn
            "
            data-product-id="${id}"
          >
            Add to Cart
          </button>

        </div>

      </div>

      <!-- CONTENT -->

      <div class="product-content">

        <div class="product-meta">

          <span class="product-category">
            ${category || 'Marketplace'}
          </span>

          ${
            stock > 0
              ? `
            <span class="stock-status in-stock">
              In Stock
            </span>
          `
              : `
            <span class="stock-status out-stock">
              Out of Stock
            </span>
          `
          }

        </div>

        <!-- TITLE -->

        <a
          href="product.html?id=${id}"
          class="product-title-link"
        >

          <h3 class="product-title">
            ${truncateText(name, 72)}
          </h3>

        </a>

        <!-- VENDOR -->

        <div class="product-vendor">
          by ${vendor || 'Arnorex Official'}
        </div>

        <!-- RATING -->

        <div class="product-rating">

          <div class="stars">
            ${renderStars(rating)}
          </div>

          <span class="rating-text">
            (${reviews || 0})
          </span>

        </div>

        <!-- PRICE -->

        <div class="product-price-row">

          <div class="price-group">

            <span class="current-price">
              ${formatPrice(price)}
            </span>

            ${
              oldPrice
                ? `
              <span class="old-price">
                ${formatPrice(oldPrice)}
              </span>
            `
                : ''
            }

          </div>

        </div>

      </div>

    </article>
  `;

};

/* =========================================
   RENDER PRODUCT GRID
========================================= */

export const renderProductGrid = ({
  container,
  products = []
}) => {

  const element =
    typeof container === 'string'
      ? document.querySelector(
          container
        )
      : container;

  if (!element) {
    return;
  }

  element.innerHTML =
    products
      .map(createProductCard)
      .join('');

  initializeProductEvents(element);

};

/* =========================================
   PRODUCT EVENTS
========================================= */

export const initializeProductEvents = (
  container = document
) => {

  /* ADD TO CART */

  container
    .querySelectorAll(
      '.add-cart-btn'
    )
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          const card =
            button.closest(
              '.product-card'
            );

          const productId =
            card.dataset.productId;

          const product =
            window.demoProducts?.find(
              item =>
                String(item.id) ===
                String(productId)
            );

          if (!product) {
            return;
          }

          addToCart(product);

          showNotification({
            type: 'success',

            message:
              'Added to cart successfully'
          });

          button.classList.add(
            'added'
          );

          button.textContent =
            'Added';

          setTimeout(() => {

            button.classList.remove(
              'added'
            );

            button.textContent =
              'Add to Cart';

          }, 1500);

        }
      );

    });

  /* FAVORITES */

  container
    .querySelectorAll(
      '.product-favorite-btn'
    )
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          const card =
            button.closest(
              '.product-card'
            );

          const productId =
            card.dataset.productId;

          const product =
            window.demoProducts?.find(
              item =>
                String(item.id) ===
                String(productId)
            );

          if (!product) {
            return;
          }

          toggleFavorite(product);

          button.classList.toggle(
            'active'
          );

          const active =
            button.classList.contains(
              'active'
            );

          showNotification({
            type: 'info',

            message:
              active
                ? 'Added to favorites'
                : 'Removed from favorites'
          });

        }
      );

    });

  /* PRODUCT VIEW */

  container
    .querySelectorAll(
      '.product-image-link, .product-title-link'
    )
    .forEach(link => {

      link.addEventListener(
        'click',
        () => {

          const card =
            link.closest(
              '.product-card'
            );

          const productId =
            card.dataset.productId;

          const product =
            window.demoProducts?.find(
              item =>
                String(item.id) ===
                String(productId)
            );

          if (!product) {
            return;
          }

          addRecentlyViewed(product);

        }
      );

    });

};

/* =========================================
   STAR RENDERER
========================================= */

export const renderStars = (
  rating = 0
) => {

  const rounded =
    Math.round(rating);

  let stars = '';

  for (
    let i = 1;
    i <= 5;
    i++
  ) {

    stars += `
      <span class="
        star
        ${i <= rounded ? 'filled' : ''}
      ">
        ★
      </span>
    `;
  }

  return stars;

};

/* =========================================
   DISCOUNT CALCULATOR
========================================= */

export const calculateDiscount = (
  oldPrice,
  currentPrice
) => {

  if (
    !oldPrice ||
    oldPrice <= currentPrice
  ) {
    return 0;
  }

  return Math.round(
    (
      (
        oldPrice -
        currentPrice
      ) /
      oldPrice
    ) * 100
  );

};

/* =========================================
   EMPTY PRODUCTS STATE
========================================= */

export const renderEmptyProducts = (
  container,
  message = 'No products found'
) => {

  const element =
    typeof container === 'string'
      ? document.querySelector(
          container
        )
      : container;

  if (!element) {
    return;
  }

  element.innerHTML = `
    <div class="
      empty-products
      premium-card
      text-center
    ">

      <div class="empty-icon">
        📦
      </div>

      <h3>
        ${message}
      </h3>

      <p>
        Try adjusting filters or
        search keywords.
      </p>

    </div>
  `;

};

/* =========================================
   PRODUCT SKELETON
========================================= */

export const renderProductSkeletons = (
  container,
  count = 8
) => {

  const element =
    typeof container === 'string'
      ? document.querySelector(
          container
        )
      : container;

  if (!element) {
    return;
  }

  const skeletons =
    Array(count)
      .fill(null)
      .map(
        () => `
        <div class="
          product-skeleton
          premium-card
        ">

          <div class="
            skeleton
            skeleton-image
          "></div>

          <div class="
            skeleton
            skeleton-title
          "></div>

          <div class="
            skeleton
            skeleton-text
          "></div>

          <div class="
            skeleton
            skeleton-price
          "></div>

        </div>
      `
      )
      .join('');

  element.innerHTML =
    skeletons;

};

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {
  createProductCard,
  renderProductGrid,

  initializeProductEvents,

  renderStars,

  calculateDiscount,

  renderEmptyProducts,

  renderProductSkeletons
};