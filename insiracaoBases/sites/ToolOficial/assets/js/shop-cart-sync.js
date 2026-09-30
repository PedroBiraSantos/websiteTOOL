// Shop cart-sync loader (ES module with top-level await)
await import("https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.init-shop-cart-sync.en.esm.js");
window.Shopify.SignInWithShop?.initShopCartSync?.({"fedCMEnabled":true,"windoidEnabled":true});
