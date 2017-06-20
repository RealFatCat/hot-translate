"use strict";

browser.runtime.onMessage.addListener(request => {
  var selection = window.getSelection().toString().trim();
  if (selection) {
    browser.runtime.sendMessage({"selectedText": encodeURIComponent(selection), "openTab": request.openTab});
  }
});
