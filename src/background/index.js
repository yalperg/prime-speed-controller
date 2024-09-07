chrome.webRequest.onCompleted.addListener(
  function (details) {
    const parsedUrl = new URL(details.url);
    if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
      chrome.tabs.sendMessage(tabId, { type: 'navigate-detail' });
    }
  },
  { urls: ['*://*.primevideo.com/*'] }
);
