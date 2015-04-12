'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  localStorage.blocked = JSON.stringify([]);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  blockedSites = JSON.parse(localStorage.blocked);

  blockedSites.forEach(function (site) {
    console.log(site);
  });
});
