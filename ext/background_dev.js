chrome.runtime.onInstalled.addListener((details) => {
  localStorage['blocked'] = JSON.stringify([]);
  localStorage.shouldBlock = true;
});

chrome.browserAction.onClicked.addListener((activeTab) => {
  var newUrl = 'index.html';
  chrome.tabs.create({
    url: newUrl
  });
});

chrome.runtime.onMessage.addListener((msg, messageSender, sendResponse) => {

  if (msg.type === 'blocked') {
    localStorage.blocked = JSON.stringify(msg.blocked);
    console.log(localStorage.blocked);
  } else if (msg.type === 'shouldBlock') {
    localStorage.shouldBlock = msg.shouldBlock;
    console.log(localStorage.shouldBlock);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  if (localStorage.shouldBlock === 'true') {
    console.log('should block sites now');
    var blockedSites = JSON.parse(localStorage['blocked']) || [];
    blockedSites.forEach((site) => {
      console.log(tab.url.replace('https', 'http').replace('www.', ''), site.url);
      if (tab.url.replace('https', 'http').search(site.url) !== -1) {
        console.log('blocked a tab');
        chrome.tabs.update(tab.id, {
          url: 'index.html'
        });
      }
    });
  }
});

/*
  Free Time session
  only delete when on free session
  pull data when the user opens the extension
 */
