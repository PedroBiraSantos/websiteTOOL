// Tracking: GA4 gtag, Attentive tag loader, Shopify __st, perf beacon, Trekkie shim, Web Pixels Manager, ShopifyAnalytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2CYSMDYMSC');
(function() {
  var isLoaded = false;
  function asyncLoad() {
    if (isLoaded) return;
    isLoaded = true;
    var urls = ["https:\/\/cdn.attn.tv\/tool\/dtag.js?shop=tool-band-mt.myshopify.com"];
    for (var i = 0; i < urls.length; i++) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = urls[i];
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
  };
  if(window.attachEvent) {
    window.attachEvent('onload', asyncLoad);
  } else {
    window.addEventListener('load', asyncLoad, false);
  }
})();
var __st={"a":98125840701,"offset":-14400,"reqid":"bdfc283c-bef7-49b3-867a-badf884c3de0-1790789126","pageurl":"store.toolband.com\/","u":"64fc126d2dd2","p":"home"};
(function () {var userAgent = navigator.userAgent;var platform = navigator.platform;var maxTouchPoints = navigator.maxTouchPoints || 0;var isIOS = /iPad|iPhone|iPod/.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1);var isMacSafari = platform.indexOf('Mac') === 0 && /Safari/.test(userAgent) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android/.test(userAgent);var isAppleSafari = isIOS || isMacSafari;if (isAppleSafari) {fetch('/sf_private_access_tokens' + location.search).catch(function () {});}function browserMajorVersion(pattern) {var match = userAgent.match(pattern);return match ? parseInt(match[1], 10) : null;}function shouldLoadAutosizesPolyfill() {if (!window.PerformanceObserver?.supportedEntryTypes?.includes('paint')) {return false;}var chromeVersion = browserMajorVersion(/Chrome\/(\d+)/);if (chromeVersion !== null) {return chromeVersion < 126;}var firefoxVersion = browserMajorVersion(/Firefox\/(\d+)/);if (firefoxVersion !== null) {return firefoxVersion < 150;}var safariVersion = isAppleSafari ? browserMajorVersion(/Version\/(\d+).*Safari\//) : null;if (safariVersion !== null) {return safariVersion < 27;}return true;}if (shouldLoadAutosizesPolyfill()) {var autosizesScript = document.createElement('script');autosizesScript.async = true;autosizesScript.crossOrigin = 'anonymous';autosizesScript.src = "//store.toolband.com/cdn/shopifycloud/storefront/assets/storefront/autosizes-84416378.js";(document.head || document.documentElement).appendChild(autosizesScript);}window.ShopifyAnalytics = window.ShopifyAnalytics || {};window.ShopifyAnalytics.performance = window.ShopifyAnalytics.performance || {};(function () {var LONG_FRAME_THRESHOLD = 50;var longAnimationFrames = [];var activeRafId = null;function collectLongFrames() {var previousTime = null;function rafMonitor(now) {if (activeRafId === null) {return;}var delta = now - previousTime;if (delta > LONG_FRAME_THRESHOLD) {longAnimationFrames.push({startTime: previousTime,endTime: now,});}previousTime = now;activeRafId = requestAnimationFrame(rafMonitor);}previousTime = performance.now();activeRafId = requestAnimationFrame(rafMonitor);}if (!window.PerformanceObserver?.supportedEntryTypes?.includes('long-animation-frame')) {collectLongFrames();var timeoutId = setTimeout(function () {cancelAnimationFrame(activeRafId);}, 10000);window.ShopifyAnalytics.performance.getLongAnimationFrames = function (stopCollection) {if (stopCollection === undefined) {stopCollection = false;}if (stopCollection) {clearTimeout(timeoutId);cancelAnimationFrame(activeRafId);}return longAnimationFrames;};}})();})();
(function(){if ("sendBeacon" in navigator && "performance" in window) {try {var session_token_from_headers = performance.getEntriesByType('navigation')[0].serverTiming.find(x => x.name == '_s').description;} catch {var session_token_from_headers = undefined;}var session_cookie_matches = document.cookie.match(/_shopify_s=([^;]*)/);var session_token_from_cookie = session_cookie_matches && session_cookie_matches.length === 2 ? session_cookie_matches[1] : "";var session_token = session_token_from_headers || session_token_from_cookie || "";function handle_abandonment_event(e) {var entries = performance.getEntries().filter(function(entry) {return /monorail-edge.shopifysvc.com/.test(entry.name);});if (!window.abandonment_tracked && entries.length === 0) {window.abandonment_tracked = true;var currentMs = Date.now();var navigation_start = performance.timing.navigationStart;var payload = {shop_id: 98125840701,url: window.location.href,navigation_start,duration: currentMs - navigation_start,session_token,page_type: "index"};window.navigator.sendBeacon("https://monorail-edge.shopifysvc.com/v1/produce", JSON.stringify({schema_id: "online_store_buyer_site_abandonment/1.1",payload: payload,metadata: {event_created_at_ms: currentMs,event_sent_at_ms: currentMs}}));}}window.addEventListener('pagehide', handle_abandonment_event);}}());
window.__TREKKIE_SHIM_QUEUE = window.__TREKKIE_SHIM_QUEUE || [];
(function(){var wpmLoader=function(){"use strict";var e=/Googlebot|Storebot-Google|bingbot|Baiduspider|YandexBot|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|AdsBot-Google|Mediapartners-Google|APIs-Google|PetalBot|SemrushBot|AhrefsBot|MJ12bot|DotBot|Acunetix|PerplexityBot|Perplexity-User/i,t=/bytedance/i;function i(){try{var e=document.cookie;if(!e||"string"!=typeof e)return;for(var t=0,i=e.split(";");t<i.length;t++){var n=i[t],r=n.indexOf("=");if(-1!==r){var o=n.slice(0,r).trim();if(o){var a=void 0;try{a=decodeURIComponent(o)}catch(e){a=o}if("_shopify_s"===a){var d=n.slice(r+1).trim();try{return decodeURIComponent(d)}catch(e){return d}}}}}return}catch(e){return}}function n(e){try{"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(e)}catch(e){}}function r(e,t){return"string"==typeof e&&e.length>0&&e.length<=t?e:void 0}function o(e){var t;switch(null==(t=null==e?void 0:e.navigation)?void 0:t.type){case 0:return"navigate";case 1:return"reload";case 2:return"back_forward";default:return}}function a(){var e,t,i;try{var n=null==(i=null==(t=null==(e=self.ShopifyAnalytics)?void 0:e.lib)?void 0:t.trekkie)?void 0:i.state;return"awaiting-consent"===n||"initialized"===n?n:void 0}catch(e){return}}return function(d,s,u,l){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};try{var p=c.trekkieShim;!0!==p&&"true"!==p||null!=window.__TREKKIE_SHIM_QUEUE||(window.__TREKKIE_SHIM_QUEUE=[])}catch(e){}var f,v,h,y,g=(v=(f={modern:/Edge?\/(1{2}[4-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Firefox\/(1{2}[4-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Chrom(ium|e)\/(9{2}|\d{3,})\.\d+(\.\d+|)|(Maci|X1{2}).+ Version\/(15\.\d+|(1[6-9]|[2-9]\d|\d{3,})\.\d+)([,.]\d+|)( \(\w+\)|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(9{2}|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(15[._]\d+|(1[6-9]|[2-9]\d|\d{3,})[._]\d+)([._]\d+|)|Android:?[ /-](14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Android.+Firefox\/(15\d|1[6-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+Chrom(ium|e)\/(14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|SamsungBrowser\/([2-9]\d|\d{3,})\.\d+/,legacy:/Edge?\/(1[6-9]|[2-9]\d|\d{3,})\.\d+(\.\d+|)|Firefox\/(5[4-9]|[6-9]\d|\d{3,})\.\d+(\.\d+|)|Chrom(ium|e)\/(5[1-9]|[6-9]\d|\d{3,})\.\d+(\.\d+|)([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$))|(Maci|X1{2}).+ Version\/(10\.\d+|(1[1-9]|[2-9]\d|\d{3,})\.\d+)([,.]\d+|)( \(\w+\)|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(3[89]|[4-9]\d|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(10[._]\d+|(1[1-9]|[2-9]\d|\d{3,})[._]\d+)([._]\d+|)|Android:?[ /-](14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Mobile Safari.+OPR\/([89]\d|\d{3,})\.\d+\.\d+|Android.+Firefox\/(15\d|1[6-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+Chrom(ium|e)\/(14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+(UC? ?Browser|UCWEB|U3)[ /]?(15\.([5-9]|\d{2,})|(1[6-9]|[2-9]\d|\d{3,})\.\d+)\.\d+|SamsungBrowser\/(5\.\d+|([6-9]|\d{2,})\.\d+)|Android.+MQ{2}Browser\/(14(\.(9|\d{2,})|)|(1[5-9]|[2-9]\d|\d{3,})(\.\d+|))(\.\d+|)|K[Aa][Ii]OS\/(3\.\d+|([4-9]|\d{2,})\.\d+)(\.\d+|)/}).modern,h=f.legacy,(y=navigator.userAgent).match(e)?"bot":y.match(v)?"modern":y.match(h)?"legacy":y.match(t)?"bot":"unknown"),m=function(e){var t,i,n=r(e,128);try{var a=window.performance,d=null==(t=null==a?void 0:a.getEntriesByType)?void 0:t.call(a,"navigation")[0];if(!d)return{requestId:n,navigationType:o(a)};var s="type"in d?r(d.type,64):void 0,u="serverTiming"in d&&Array.isArray(d.serverTiming)?d.serverTiming:[];return{requestId:null!=n?n:r(null==(i=u.find(function(e){return"requestID"===e.name}))?void 0:i.description,128),navigationType:s}}catch(e){return{requestId:n}}}(c.requestId),w=function(e){var t=e.version,r=e.browserTarget,o=e.surface,a=e.shopId,d=e.monorailEndpoint,s=window.location.href;return{emit:function(e){var u=e.status,l=e.errorMsg,c=e.failureReason,p=e.useKeepaliveFallback,f=void 0!==p&&p,v=e.navigationType,h=e.pagehidePersisted,y=e.requestId,g=e.trekkieState;if(d){var m,w;try{var b=(new Date).getTime();m=JSON.stringify({metadata:{event_sent_at_ms:b},events:[{schema_id:"web_pixels_manager_load/3.3",payload:{version:t,bundle_target:r,page_url:s,status:u,surface:o,error_msg:l,failure_reason:c,navigation_type:v,pagehide_persisted:h,request_id:y,trekkie_state:g,shop_id:a,visit_token:i()},metadata:{event_created_at_ms:b}}]})}catch(e){return}try{if("function"==typeof window.navigator.sendBeacon&&-1===(w=window.navigator.userAgent).indexOf("iPhone; CPU iPhone OS 12_")&&-1===w.indexOf("iPad; CPU OS 12_")&&-1===w.indexOf("iPod touch; CPU iPhone OS 12_")&&window.navigator.sendBeacon.bind(window.navigator)(d,m))return}catch(e){}if(f)try{"function"==typeof window.fetch&&window.fetch(d,{method:"POST",headers:{"Content-Type":"text/plain"},body:m,keepalive:!0}).catch(function(){})}catch(e){}else try{var _=new XMLHttpRequest;_.open("POST",d,!0),_.setRequestHeader("Content-Type","text/plain"),_.send(m)}catch(e){n("[Web Pixels Manager] Got an unhandled error while logging to Monorail.")}}else n("[Web Pixels Manager] No Monorail endpoint provided, skipping logging.")}}}({version:u,browserTarget:g,surface:d.surface,shopId:d.shopId,monorailEndpoint:d.monorailEndpoint});if(Boolean(null==(_=null==(b=window.Shopify)?void 0:b.analytics)?void 0:_.replayQueue))w.emit({status:"setup-skipped",errorMsg:"replay queue already initialized."});else{var b,_;w.emit({status:"setup-started"}),window.Shopify=window.Shopify||{};var S=window.Shopify;S.analytics=S.analytics||{};var P=S.analytics;P.replayQueue=[],P.publish=function(e,t,i){return P.replayQueue.push([e,t,i]),!0};try{self.performance.mark("wpm:start")}catch(e){}var k,C="modern"===g?"modern":"legacy",E=(null!=l?l:{modern:"",legacy:""})[C],I=[(k={baseUrl:s,hashVersion:u,buildTarget:C}).baseUrl,"/wpm","/b",k.hashVersion,"modern"===k.buildTarget?"m":"l",".js"].join(""),O=!1,T=!1;try{c.browserTarget=g,function(){O=!0;try{window.addEventListener("pagehide",M)}catch(e){O=!1}}(),R(function(){try{R(x)}catch(e){D(e)}}),w.emit({status:"loading",requestId:m.requestId,navigationType:m.navigationType,trekkieState:a()})}catch(e){D(e)}}function U(){var e;if(q(),!function(){var e,t;return Boolean(null==(t=null==(e=window.Shopify)?void 0:e.analytics)?void 0:t.initialized)}()){var t,i,n;try{if("function"!=typeof(null==(e=window.webPixelsManager)?void 0:e.init))return void A();if(!(null!==(n=i=t=window.webPixelsManager.init(d))&&"function"!=typeof n&&Object(n)===n&&"publish"in i&&"function"==typeof i.publish&&"publishCustomEvent"in i&&"function"==typeof i.publishCustomEvent&&"visitor"in i&&"function"==typeof i.visitor))return void A()}catch(e){return void A(e)}var r=window.Shopify.analytics;r.replayQueue.forEach(function(e){var i=e[0],n=e[1],r=e[2];t.publishCustomEvent(i,n,r)}),r.replayQueue=[],r.publish=t.publishCustomEvent,r.visitor=t.visitor,r.initialized=!0}}function A(e){B("manager_api_unavailable",void 0===e?void 0:Q(e))}function x(){B("script_load_failed","".concat(I," has failed to load"))}function B(e,t){T||(T=!0,q(),w.emit({status:"failed",errorMsg:t,failureReason:e,requestId:m.requestId,navigationType:m.navigationType,trekkieState:a()}))}function M(e){O&&(q(),w.emit({status:"pagehide-while-loading",useKeepaliveFallback:!0,pagehidePersisted:e.persisted,requestId:m.requestId,navigationType:m.navigationType,trekkieState:a()}))}function q(){O=!1;try{window.removeEventListener("pagehide",M)}catch(e){}}function R(e){var t;!function(e){var t=e.src,i=e.async,n=void 0===i||i,r=e.onload,o=e.onerror,a=e.sri,d=e.scriptDataAttributes,s=void 0===d?{}:d,u=document.createElement("script"),l=document.querySelector("head"),c=document.querySelector("body");if(u.async=n,u.src=t,a&&(u.integrity=a,u.crossOrigin="anonymous"),s)for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))try{u.dataset[p]=String(s[p])}catch(e){}if(r&&u.addEventListener("load",r),o&&u.addEventListener("error",o),l)l.appendChild(u);else{if(!c)throw new Error("Did not find a head or body element to append the script");c.appendChild(u)}}({src:I,async:!0,onload:U,onerror:e,sri:(t=E,"string"==typeof t&&/^sha384-[A-Za-z0-9+/=]+$/.test(t)?E:""),scriptDataAttributes:c})}function D(e){B("script_append_failed",Q(e))}function Q(e){return e instanceof Error?e.message:"Unknown error"}}}();wpmLoader({shopId: 98125840701,storefrontBaseUrl: "https://store.toolband.com",extensionsBaseUrl: "https://extensions.shopifycdn.com/cdn/shopifycloud/web-pixels-manager",monorailEndpoint: "https://store.toolband.com/.well-known/shopify/monorail/unstable/produce_batch",surface: "storefront-renderer",enabledBetaFlags: ["4c64608a","16072cab","8450a54b","7ee89bf1"],webPixelsConfigList: [{"id":"3036315965","configuration":"{\"env\":\"prod\"}","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"8a9a175b11d15038a70fe78d09c59720","type":"APP","apiClientId":3977633,"privacyPurposes":["ANALYTICS","MARKETING"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized","enabledFlags":["9a3ed68a"]},{"id":"3019899197","configuration":"{\"pixel_id\":\"3901521633262367\",\"pixel_type\":\"facebook_pixel\"}","eventPayloadVersion":"v1","runtimeContext":"OPEN","scriptVersion":"96420dbe9ea96c426a1b7f364f977719","type":"APP","apiClientId":2329312,"privacyPurposes":["ANALYTICS","MARKETING","SALE_OF_DATA"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized","enabledFlags":["9a3ed68a"]},{"id":"3009708349","configuration":"{\"config\":\"{\\\"google_tag_ids\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\",\\\"GT-W6XGWHG4\\\"],\\\"target_country\\\":\\\"ZZ\\\",\\\"gtag_events\\\":[{\\\"type\\\":\\\"begin_checkout\\\",\\\"action_label\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\/qTowCJHlpeMcEKz76LUB\\\"]},{\\\"type\\\":\\\"search\\\",\\\"action_label\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\/hVEACNeYsuMcEKz76LUB\\\"]},{\\\"type\\\":\\\"remove_from_cart\\\",\\\"action_label\\\":\\\"G-JX9QQ3HT51\\\"},{\\\"type\\\":\\\"view_item\\\",\\\"action_label\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\/6sy-CJrlpeMcEKz76LUB\\\",\\\"MC-NEHCY8W0GQ\\\"]},{\\\"type\\\":\\\"add_shipping_info\\\",\\\"action_label\\\":\\\"G-JX9QQ3HT51\\\"},{\\\"type\\\":\\\"purchase\\\",\\\"action_label\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\/vIH0CI7lpeMcEKz76LUB\\\",\\\"MC-NEHCY8W0GQ\\\"]},{\\\"type\\\":\\\"page_view\\\",\\\"action_label\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\/MaFrCJflpeMcEKz76LUB\\\",\\\"MC-NEHCY8W0GQ\\\"]},{\\\"type\\\":\\\"view_item_list\\\",\\\"action_label\\\":\\\"G-JX9QQ3HT51\\\"},{\\\"type\\\":\\\"add_payment_info\\\",\\\"action_label\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\/HqjpCNqYsuMcEKz76LUB\\\"]},{\\\"type\\\":\\\"add_to_cart\\\",\\\"action_label\\\":[\\\"G-JX9QQ3HT51\\\",\\\"AW-381304236\\\/FSeNCJTlpeMcEKz76LUB\\\"]},{\\\"type\\\":\\\"view_cart\\\",\\\"action_label\\\":\\\"G-JX9QQ3HT51\\\"}],\\\"enable_monitoring_mode\\\":false}\"}","eventPayloadVersion":"v1","runtimeContext":"OPEN","scriptVersion":"a3321ca85cf5aaf6b57585fcd8d67b3a","type":"APP","apiClientId":1780363,"privacyPurposes":[],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized","enabledFlags":["9a3ed68a"]},{"id":"2703753533","configuration":"{\"storeIdentity\":\"tool-band-mt.myshopify.com\",\"baseURL\":\"https:\\\/\\\/api.printful.com\\\/shopify-pixels\"}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"74f275712857ab41bea9d998dcb2f9da","type":"APP","apiClientId":156624,"privacyPurposes":["ANALYTICS","MARKETING","SALE_OF_DATA"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized"},{"id":"226394429","eventPayloadVersion":"1","runtimeContext":"LAX","scriptVersion":"1","type":"CUSTOM","privacyPurposes":["ANALYTICS","MARKETING","SALE_OF_DATA"],"name":"MTGA4 Universal Purchase Event","dataSharingAdjustments":{"protectedCustomerApprovalScopes":[],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized"},{"id":"shopify-app-pixel","configuration":"{}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"0530","apiClientId":"shopify-pixel","type":"APP","privacyPurposes":["ANALYTICS","MARKETING"]},{"id":"shopify-custom-pixel","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"0530","apiClientId":"shopify-pixel","type":"CUSTOM","privacyPurposes":["ANALYTICS","MARKETING"]}],isMerchantRequest: false,initData: {"shop":{"name":"Tool","paymentSettings":{"currencyCode":"USD"},"myshopifyDomain":"tool-band-mt.myshopify.com","countryCode":"US","storefrontUrl":"https:\/\/store.toolband.com"},"customer":null,"cart":null,"checkout":null,"productVariants":[],"products":[{"id":"10466441560381","handle":"tool-mike-gamble-reflection-poster","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"52831815401789","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10466441691453","handle":"tool-mike-gamble-reflection-tshirt","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"52831815893309","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10466441789757","handle":"tool-mike-gamble-reflection-womens-dolman","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"52831816286525","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10466441756989","handle":"tool-mike-gamble-reflection-long-sleeve-tshirt","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"52831816089917","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10466441593149","handle":"tool-mike-gamble-reflection-pullover-hoodie","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"52831815434557","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10466441625917","handle":"tool-mike-gamble-reflection-zip-hoodie","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"52831815631165","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10457553928509","handle":"aenima-46-2-basketball-jersey","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"52796846899517","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10408468480317","handle":"torch-unisex-tee","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"51936758464829","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10513139761469","handle":"aenima-third-eye-tee","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"53090189508925","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10513139335485","handle":"aenima-tool-logo-hoodie","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"53090187739453","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]},{"id":"10408470544701","handle":"aenima-learn-to-swim-raglan","isCollective":null,"title":null,"type":null,"untranslatedTitle":null,"url":null,"vendor":null,"remoteShopId":null,"variants":[{"id":"51936767803709","image":null,"price":null,"sku":null,"title":null,"untranslatedTitle":null}]}],"purchasingCompany":null},},"https://store.toolband.com/cdn","5982071ew7ea472e3p69b68784m2150dfea",{"modern":"","legacy":""},{"trekkieShim":true,"agentContext":true,"apiClientId":"580111","facebookCapiEnabled":"true","themeId":"190371365181","themePublished":"true","eventMetadataId":"0e1b467e-1e7a-4d05-ac5d-15a2ddcc9713","pageType":"home","shopId":"98125840701","storefrontBaseUrl":"https:\/\/store.toolband.com","extensionBaseUrl":"https:\/\/extensions.shopifycdn.com\/cdn\/shopifycloud\/web-pixels-manager","surface":"storefront-renderer","enabledBetaFlags":"[\"4c64608a\", \"16072cab\", \"8450a54b\", \"7ee89bf1\"]","isMerchantRequest":"false","hashVersion":"5982071ew7ea472e3p69b68784m2150dfea","publish":"custom","events":"[[\"page_viewed\",{}]]"});})();
window.ShopifyAnalytics = window.ShopifyAnalytics || {};
window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
window.ShopifyAnalytics.meta.currency = 'USD';
var meta = {"page":{"pageType":"home","requestId":"bdfc283c-bef7-49b3-867a-badf884c3de0-1790789126"}};
for (var attr in meta) {
  window.ShopifyAnalytics.meta[attr] = meta[attr];
}
(function () {
    var customDocumentWrite = function(content) {
      var jquery = null;
      if (window.jQuery) {
        jquery = window.jQuery;
      } else if (window.Checkout && window.Checkout.$) {
        jquery = window.Checkout.$;
      }
      if (jquery) {
        jquery('body').append(content);
      }
    };
    var hasLoggedConversion = function(token) {
      if (token) {
        return document.cookie.indexOf('loggedConversion=' + token) !== -1;
      }
      return false;
    }
    var setCookieIfConversion = function(token) {
      if (token) {
        var twoMonthsFromNow = new Date(Date.now());
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
        document.cookie = 'loggedConversion=' + token + '; expires=' + twoMonthsFromNow;
      }
    }
    var trekkie = window.ShopifyAnalytics.lib = window.trekkie = window.trekkie || [];
    window.ShopifyAnalytics.lib.trekkie = window.trekkie;
    if (trekkie.integrations) {
      return;
    }
    trekkie.methods = [
      'identify',
      'page',
      'ready',
      'track',
      'trackForm',
      'trackLink'
    ];
    trekkie.factory = function(method) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        trekkie.push(args);
        if (method == 'track' || method == 'page') {
          var pageUrl;
          try {
            pageUrl = window.location.href;
          } catch (e) {}
          var pageReferrer;
          try {
            pageReferrer = document.referrer;
          } catch (e) {}
          try {
            if (window.__TREKKIE_SHIM_QUEUE == null) {
              window.__TREKKIE_SHIM_QUEUE = [];
            }
            window.__TREKKIE_SHIM_QUEUE.push({
              from: 'trekkie-stub',
              method: method,
              args: args.slice(1),
              pageContext: {
                url: pageUrl,
                referrer: pageReferrer
              }
            });
          } catch (e) {
            // no-op
          }
        }
        return trekkie;
      };
    };
    for (var i = 0; i < trekkie.methods.length; i++) {
      var key = trekkie.methods[i];
      trekkie[key] = trekkie.factory(key);
    }
    trekkie.load = function(config) {
      trekkie.config = config || {};
      trekkie.config.initialDocumentCookie = document.cookie;
      var first = document.getElementsByTagName('script')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onerror = function(e) {
  var scriptFallback = document.createElement('script');
  scriptFallback.type = 'text/javascript';
  scriptFallback.onerror = function(error) {
          var Monorail = {
      produce: function produce(monorailDomain, schemaId, payload) {
        var currentMs = new Date().getTime();
        var event = {
          schema_id: schemaId,
          payload: payload,
          metadata: {
            event_created_at_ms: currentMs,
            event_sent_at_ms: currentMs
          }
        };
        return Monorail.sendRequest("https://" + monorailDomain + "/v1/produce", JSON.stringify(event));
      },
      sendRequest: function sendRequest(endpointUrl, payload) {
        // Try the sendBeacon API
        if (window && window.navigator && typeof window.navigator.sendBeacon === 'function' && typeof window.Blob === 'function' && !Monorail.isIos12()) {
          var blobData = new window.Blob([payload], {
            type: 'text/plain'
          });
          if (window.navigator.sendBeacon(endpointUrl, blobData)) {
            return true;
          } // sendBeacon was not successful
        } // XHR beacon
        var xhr = new XMLHttpRequest();
        try {
          xhr.open('POST', endpointUrl);
          xhr.setRequestHeader('Content-Type', 'text/plain');
          xhr.send(payload);
        } catch (e) {
          console.log(e);
        }
        return false;
      },
      isIos12: function isIos12() {
        return window.navigator.userAgent.lastIndexOf('iPhone; CPU iPhone OS 12_') !== -1 || window.navigator.userAgent.lastIndexOf('iPad; CPU OS 12_') !== -1;
      }
    };
    Monorail.produce('monorail-edge.shopifysvc.com',
      'trekkie_storefront_load_errors/1.1',
      {shop_id: 98125840701,
      theme_id: 190371365181,
      app_name: "storefront",
      context_url: window.location.href,
      source_url: "//store.toolband.com/cdn/s/trekkie.storefront.f1ba865b3fecd812ad617f74ac079261075e9edb.min.js"});
  };
  scriptFallback.async = true;
  scriptFallback.src = '//store.toolband.com/cdn/s/trekkie.storefront.f1ba865b3fecd812ad617f74ac079261075e9edb.min.js';
  first.parentNode.insertBefore(scriptFallback, first);
};
script.async = true;
script.src = '//store.toolband.com/cdn/s/trekkie.storefront.f1ba865b3fecd812ad617f74ac079261075e9edb.min.js';
first.parentNode.insertBefore(script, first);
    };
    trekkie.load(
      {"Trekkie":{"appName":"storefront","development":false,"defaultAttributes":{"shopId":98125840701,"isMerchantRequest":null,"themeId":190371365181,"themeCityHash":"9505936835306122948","contentLanguage":"en","currency":"USD","eventMetadataId":"0e1b467e-1e7a-4d05-ac5d-15a2ddcc9713"},"isServerSideCookieWritingEnabled":true,"monorailRegion":"shop_domain","enabledBetaFlags":["764d78cb","8450a54b","7ee89bf1","4c64608a"]},"Session Attribution":{},"S2S":{"facebookCapiEnabled":true,"source":"trekkie-storefront-renderer","apiClientId":580111}}
    );
    var loaded = false;
    trekkie.ready(function() {
      if (loaded) return;
      loaded = true;
      window.ShopifyAnalytics.lib = window.trekkie;
      var originalDocumentWrite = document.write;
      document.write = customDocumentWrite;
      try { window.ShopifyAnalytics.merchantGoogleAnalytics.call(this); } catch(error) {};
      document.write = originalDocumentWrite;
      var match = window.location.pathname.match(/checkouts\/(.+)\/(thank_you|post_purchase)/)
      var token = match? match[1]: undefined;
      if (!hasLoggedConversion(token)) {
        setCookieIfConversion(token);
      }
    });
    window.ShopifyAnalytics.lib.page(null,{"pageType":"home","requestId":"bdfc283c-bef7-49b3-867a-badf884c3de0-1790789126","shopifyEmitted":true});
    var eventsListenerScript = document.createElement('script');
    eventsListenerScript.async = true;
    eventsListenerScript.src = "//store.toolband.com/cdn/shopifycloud/storefront/assets/shop_events_listener-4e26a9ce.js";
    document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);
})();
