var notifyImg = "data/icon-32-white.png";
var apiKey = "";
var selectedText = "";

browser.runtime.onMessage.addListener((message) => {
  selectedText = message.selectedText;
});

browser.commands.onCommand.addListener((command) => {
  if (selectedText) {
    browser.storage.local.get("translateTo")
    .then((item) => {
      var langTo = item.translateTo;
      var resultUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + apiKey + "&lang=" + langTo + "&text=" + selectedText;

      fetch(resultUrl)
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
        });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
  }
});

browser.browserAction.onClicked.addListener(state => {
  if (selectedText) {
    browser.storage.local.get("translateTo")
    .then((item) => {
      var langTo = item.translateTo;
      var resultUrl = "https://translate.yandex.net/api/v1.5/tr.json/detect?key=" + apiKey + "&text=" + selectedText;

      fetch(resultUrl)
        .then((response) => { return response.json(); })
        .then((json) => {
          var detectedLang = json["lang"];
          browser.tabs.create({
            "url": "https://translate.yandex.ru/?text=" + selectedText + "&lang=" + detectedLang + "-" + langTo
          });
          selectedText = "";
        })
        .catch((err) => {
          selectedText = "";
        });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
  }
});

