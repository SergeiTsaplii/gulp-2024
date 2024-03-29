import LazyLoad from 'vanilla-lazyload';

// Працює з об'єктами з класом ._lazy
const lazyImages = new LazyLoad({
  elements_selector: '[data-src],[data-srcset]',
  class_loaded: '_lazy-loaded',
  use_native: true,
});

// lazyMedia.update();

export default lazyImages;
