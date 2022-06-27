(function () {
  // stub of a 3rd party analytics library.

  window.analytics = {
    trackPage: function (pageName, dimensions) {
      this.calls.push({
        type: 'page',
        pageName,
        dimensions,
      });
      // omitted: server call.

      // console.log('!!!!! trackPage', pageName, dimensions);
    },

    trackEvent: function (eventName, dimensions) {
      this.calls.push({
        type: 'event',
        eventName,
        dimensions,
      });
      // omitted: server call.

      // console.log('!!!!! trackEvent', eventName, dimensions);
    },

    trackConversion: function (revenue, dimensions) {
      this.calls.push({
        type: 'conversion',
        revenue,
        dimensions,
      });
      // omitted: server call.

      // console.log('!!!!! trackConversion', revenue, dimensions);
    },

    calls: [],
  };
})();
