// OneTrust callback: tags cookie-policy links and dispatches OneTrustGroupsUpdated
function OptanonWrapper() {
      var cookiePolicyLink = 'https://www.wminewmedia.com/cookies-policy/';
      var allLinks = document.querySelectorAll('a');
      for(i = 0; i < allLinks.length; i++) {
        let href = allLinks[i].href;
        if (href.indexOf(cookiePolicyLink) > -1 && href.indexOf('?ot=') < 0) {
          href = href + '?ot=93470cdf-552b-4cf1-b3af-9c25672690cb&url=' + window.location.hostname;
          allLinks[i].setAttribute("href", href);
          allLinks[i].setAttribute("target", "_blank");
        }
      }             
      var eOT = new Event("OneTrustGroupsUpdated");
      document.dispatchEvent(eOT);
      var regCheckPerformance = /,C0002,/;
      var regCheckFunctional = /,C0003,/;
      var regCheckTargeting = /,C0004,/;
      var regCheckSocial = /,C0008,/;
}
