/* =========================================
   ARNOREX APPLICATION CORE
   Marketplace Bootstrap Engine
========================================= */

import state, {
  initializeState,
  subscribe,
  getState,
  getCartCount
} from './state.js';

import {
  APP
} from './constants.js';

/* =========================================
   DOM READY
========================================= */

document.addEventListener(
  'DOMContentLoaded',
  async () => {

    console.log(
      `${APP.NAME} initialized`
    );

    bootApplication();

  }
);

/* =========================================
   APPLICATION BOOT
========================================= */

const bootApplication = () => {

  initializeState();

  initializeNavbar();

  initializeSearch();

  initializeAnimations();

  initializeNotifications();

  initializeGlobalEvents();

  initializeTheme();

  syncUIWithState();

  subscribe(syncUIWithState);

  console.log(
    'Arnorex boot completed'
  );
};

/* =========================================
   NAVBAR SYSTEM
========================================= */

const initializeNavbar = () => {

  const navbar =
    document.querySelector('.navbar');

  if (!navbar) {
    return;
  }

  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {

      const currentScroll =
        window.scrollY;

      if (currentScroll > 80) {

        navbar.classList.add(
          'navbar-scrolled'
        );

      } else {

        navbar.classList.remove(
          'navbar-scrolled'
        );
      }

      if (
        currentScroll > lastScroll &&
        currentScroll > 120
      ) {

        navbar.style.transform =
          'translateY(-120%)';

      } else {

        navbar.style.transform =
          'translateY(0)';
      }

      lastScroll = currentScroll;

    }
  );

};

/* =========================================
   SEARCH SYSTEM
========================================= */

const initializeSearch = () => {

  const searchInput =
    document.querySelector(
      '.search-input'
    );

  const searchButton =
    document.querySelector(
      '.search-button'
    );

  if (!searchInput || !searchButton) {
    return;
  }

  const executeSearch = () => {

    const query =
      searchInput.value.trim();

    if (!query) {
      return;
    }

    console.log(
      'Searching:',
      query
    );

    window.location.href =
      `product.html?search=${encodeURIComponent(query)}`;
  };

  searchButton.addEventListener(
    'click',
    executeSearch
  );

  searchInput.addEventListener(
    'keydown',
    (event) => {

      if (event.key === 'Enter') {
        executeSearch();
      }

    }
  );

};

/* =========================================
   UI SYNCHRONIZATION
========================================= */

const syncUIWithState = () => {

  const currentState =
    getState();

  updateCartBadge(
    currentState.cart
  );

  updateFavoriteBadge(
    currentState.favorites
  );

  updateTheme(
    currentState.settings.theme
  );

};

/* =========================================
   CART BADGE
========================================= */

const updateCartBadge = (
  cart
) => {

  const badges =
    document.querySelectorAll(
      '.nav-badge'
    );

  if (!badges.length) {
    return;
  }

  const total =
    getCartCount();

  if (badges[1]) {

    badges[1].textContent =
      total;

  }

};

/* =========================================
   FAVORITES BADGE
========================================= */

const updateFavoriteBadge = (
  favorites
) => {

  const badges =
    document.querySelectorAll(
      '.nav-badge'
    );

  if (!badges.length) {
    return;
  }

  if (badges[0]) {

    badges[0].textContent =
      favorites.length;

  }

};

/* =========================================
   ANIMATIONS
========================================= */

const initializeAnimations = () => {

  const animatedElements =
    document.querySelectorAll(
      '.animate-fade-up'
    );

  if (!animatedElements.length) {
    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'visible'
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  animatedElements.forEach(
    element =>
      observer.observe(element)
  );

};

/* =========================================
   NOTIFICATIONS ENGINE
========================================= */

const initializeNotifications = () => {

  if (
    document.querySelector(
      '.notification-container'
    )
  ) {
    return;
  }

  const container =
    document.createElement('div');

  container.className =
    'notification-container';

  document.body.appendChild(
    container
  );

};

/* =========================================
   SHOW NOTIFICATION
========================================= */

export const showNotification = ({
  type = 'info',
  message = ''
}) => {

  const container =
    document.querySelector(
      '.notification-container'
    );

  if (!container) {
    return;
  }

  const notification =
    document.createElement('div');

  notification.className =
    `notification notification-${type}`;

  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
    </div>
  `;

  container.appendChild(
    notification
  );

  requestAnimationFrame(() => {

    notification.classList.add(
      'show'
    );

  });

  setTimeout(() => {

    notification.classList.remove(
      'show'
    );

    setTimeout(() => {

      notification.remove();

    }, 300);

  }, 4000);

};

/* =========================================
   GLOBAL EVENTS
========================================= */

const initializeGlobalEvents = () => {

  document.addEventListener(
    'click',
    (event) => {

      const target =
        event.target;

      /* FAVORITE BUTTON */

      if (
        target.closest(
          '.product-favorite-btn'
        )
      ) {

        target
          .closest(
            '.product-favorite-btn'
          )
          .classList.toggle(
            'active'
          );
      }

      /* QUICK ACTION BUTTON */

      if (
        target.closest(
          '.product-action-btn'
        )
      ) {

        const button =
          target.closest(
            '.product-action-btn'
          );

        button.classList.add(
          'clicked'
        );

        setTimeout(() => {

          button.classList.remove(
            'clicked'
          );

        }, 250);
      }

    }
  );

};

/* =========================================
   THEME ENGINE
========================================= */

const initializeTheme = () => {

  const currentState =
    getState();

  updateTheme(
    currentState.settings.theme
  );

};

const updateTheme = (
  theme
) => {

  document.documentElement.setAttribute(
    'data-theme',
    theme
  );

};

/* =========================================
   PAGE TRANSITION EFFECT
========================================= */

window.addEventListener(
  'pageshow',
  () => {

    document.body.classList.add(
      'page-loaded'
    );

  }
);

/* =========================================
   PERFORMANCE LOG
========================================= */

window.addEventListener(
  'load',
  () => {

    console.log(
      'Page fully loaded'
    );

  }
);

/* =========================================
   DEBUG EXPORT
========================================= */

window.Arnorex = {
  state
};
