// Image grid custom element: copies each image alt into its link aria-label
(function() {
  class ImageGridaawfsedzvwkh2dxz1raigenblock6931e309t6wjr extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.setupAccessibility();
    }
    setupAccessibility() {
      const links = this.querySelectorAll('a');
      links.forEach((link) => {
        if (!link.getAttribute('aria-label')) {
          const img = link.querySelector('img');
          if (img && img.alt) {
            link.setAttribute('aria-label', img.alt);
          }
        }
      });
    }
  }
  customElements.define('image-grid-aawfsedzvwkh2dxz1raigenblock6931e309t6wjr', ImageGridaawfsedzvwkh2dxz1raigenblock6931e309t6wjr);
})();
