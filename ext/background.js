(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  localStorage.blocked = JSON.stringify([]);
  localStorage.shouldBlock = true;
});

chrome.browserAction.onClicked.addListener(function (activeTab) {
  var newUrl = 'index.html';
  chrome.tabs.create({
    url: newUrl
  });
});

chrome.runtime.onMessage.addListener(function (msg, messageSender, sendResponse) {

  if (msg.type === 'blocked') {
    localStorage.blocked = JSON.stringify(msg.blocked);
    console.log(localStorage.blocked);
  } else if (msg.type === 'shouldBlock') {
    localStorage.shouldBlock = msg.shouldBlock;
    console.log(localStorage.shouldBlock);
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(localStorage.blocked);
  if (localStorage.shouldBlock === 'true') {
    console.log('should block sites now');
    var blockedSites = JSON.parse(localStorage.blocked) || [];
    blockedSites.forEach(function (site) {
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

},{}]},{},[1]);
