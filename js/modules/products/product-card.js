/* =========================================
   ARNOREX PRODUCT CARD ENGINE
========================================= */

import {
  formatCurrency
} from '../../utils/formatter.js';

/* =========================================
   CREATE STAR RATING
========================================= */

export const createStars = (
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
   CREATE PRODUCT CARD
========================================= */

export const createProductCard = (
  product
) => {

  return `

    <article class="
      product-card
      ${product.featured
        ? 'featured-product'
        : ''}
    ">

      <!-- IMAGE -->

      <div class="
        product-image-wrapper
      ">

        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
        />

        <!-- BADGES -->

        <div class="
          product-badges
        ">

          <span class="
            premium-badge
            gold-badge
          ">
            ${product.badge}
          </span>

        </div>

        <!-- ACTIONS -->

        <div class="
          product-actions
        ">

          <button
            class="
              product-favorite-btn
            "
            data-id="${product.id}"
          >
            ❤
          </button>

          <button
            class="
              add-cart-btn
            "
            data-id="${product.id}"
          >
            Add to Cart
          </button>

        </div>

      </div>

      <!-- CONTENT -->

      <div class="
        product-content
      ">

        <!-- META -->

        <div class="
          product-meta
        ">

          <span class="
            product-category
          ">
            ${product.category}
          </span>

          <span class="
            stock-status
            ${product.stock > 0
              ? 'in-stock'
              : 'out-stock'
            }
          ">

            ${
              product.stock > 0
                ? 'In Stock'
                : 'Out of Stock'
            }

          </span>

        </div>

        <!-- TITLE -->

        <a
          href="
            product.html?id=${product.id}
          "
          class="
            product-title-link
          "
        >

          <h3 class="
            product-title
          ">
            ${product.name}
          </h3>

        </a>

        <!-- VENDOR -->

        <div class="
          product-vendor
        ">
          By ${product.vendor}
        </div>

        <!-- RATING -->

        <div class="
          product-rating
        ">

          <div class="
            stars
          ">
            ${createStars(product.rating)}
          </div>

          <span class="
            rating-text
          ">
            (${product.reviews})
          </span>

        </div>

        <!-- PRICE -->

        <div class="
          product-price-row
        ">

          <div class="
            price-group
          ">

            <span class="
              current-price
            ">
              ${formatCurrency(product.price)}
            </span>

            <span class="
              old-price
            ">
              ${formatCurrency(product.oldPrice)}
            </span>

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

  const target =
    typeof container === 'string'
      ? document.querySelector(
          container
        )
      : container;

  if (!target) {
    return;
  }

  target.innerHTML =
    products
      .map(product =>
        createProductCard(product)
      )
      .join('');

  initializeProductCardActions();

};

/* =========================================
   EMPTY STATE
========================================= */

export const renderEmptyProducts = (
  container
) => {

  const target =
    typeof container === 'string'
      ? document.querySelector(
          container
        )
      : container;

  if (!target) {
    return;
  }

  target.innerHTML = `

    <div class="
      empty-products
    ">

      <div class="
        empty-icon
      ">
        📦
      </div>

      <h3>
        No Products Found
      </h3>

      <p>
        Try another category
        or search keyword.
      </p>

    </div>

  `;

};

/* =========================================
   PRODUCT SKELETONS
========================================= */

export const renderProductSkeletons = (
  container,
  count = 8
) => {

  const target =
    typeof container === 'string'
      ? document.querySelector(
          container
        )
      : container;

  if (!target) {
    return;
  }

  let skeletons = '';

  for (
    let i = 0;
    i < count;
    i++
  ) {

    skeletons += `

      <div class="
        product-card
        product-skeleton
      ">

        <div class="
          skeleton-image
          shimmer
        "></div>

        <div class="
          product-content
        ">

          <div class="
            skeleton-title
            shimmer
          "></div>

          <div class="
            skeleton-text
            shimmer
          "></div>

          <div class="
            skeleton-price
            shimmer
          "></div>

        </div>

      </div>

    `;

  }

  target.innerHTML =
    skeletons;

};

/* =========================================
   FAVORITES
========================================= */

export const toggleFavorite = (
  button
) => {

  button.classList.toggle(
    'active'
  );

};

/* =========================================
   ADD TO CART
========================================= */

export const addToCartAnimation = (
  button
) => {

  const original =
    button.textContent;

  button.classList.add(
    'added'
  );

  button.textContent =
    'Added ✓';

  setTimeout(() => {

    button.classList.remove(
      'added'
    );

    button.textContent =
      original;

  }, 2000);

};

/* =========================================
   INITIALIZE ACTIONS
========================================= */

export const initializeProductCardActions =
  () => {

  /* FAVORITES */

  document
    .querySelectorAll(
      '.product-favorite-btn'
    )
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          toggleFavorite(
            button
          );

        }
      );

    });

  /* ADD TO CART */

  document
    .querySelectorAll(
      '.add-cart-btn'
    )
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          addToCartAnimation(
            button
          );

        }
      );

    });

};

/* =========================================
   EXPORT DEFAULT
========================================= */

export default {

  createProductCard,

  renderProductGrid,

  renderEmptyProducts,

  renderProductSkeletons,

  initializeProductCardActions

};