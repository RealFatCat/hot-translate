var notifyImg = "data/icon-32-white.png";
var apiKey = "";

browser.runtime.onMessage.addListener((message) => {
  var selectedText = message.selectedText;
  var langTo;
  if (message.openTab) {
    browser.storage.local.get("translateTo")
    .then((item) => {
      langTo = item.translateTo || "ru";
      var resultUrl = "https://translate.yandex.net/api/v1.5/tr.json/detect?key=" + apiKey + "&text=" + selectedText;
      return fetch(resultUrl);
    })
    .then((response) => { return response.json(); })
    .then((json) => {
      var detectedLang = json["lang"];
      browser.tabs.create({
        "url": "https://translate.yandex.com/?text=" + selectedText + "&lang=" + detectedLang + "-" + langTo
      });
      selectedText = "";
    })
    .catch((err) => {
      selectedText = "";
      console.log(`Error: ${err}`);
    });
  } else {
    browser.storage.local.get("translateTo")
    .then((item) => {
      langTo = item.translateTo || "ru";
      var resultUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + apiKey + "&lang=" + langTo + "&text=" + selectedText;
      return fetch(resultUrl);
    })
    .then((response) => { return response.json(); })
    .then((json) => {
      browser.notifications.create("hot-translate-notification", {
        "type": "basic",
        "iconUrl": notifyImg,
        "title": "",
        "message": json.text[0]
      });
      selectedText = "";
    })
    .catch((err) => {
      selectedText = "";
      console.log(`Error: ${err}`);
    });
  }
});

browser.commands.onCommand.addListener((command) => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  })
  .then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {openTab: false});
  })
  .catch((err) => {
    console.log(err);
  })
});

browser.browserAction.onClicked.addListener(state => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  })
  .then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {openTab: true});
  })
  .catch((err) => {
    console.log(err);
  });
});

