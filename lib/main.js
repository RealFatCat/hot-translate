var { Hotkey } = require("sdk/hotkeys");
var { ActionButton } = require("sdk/ui/button/action");
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
var selection = require("sdk/selection");
var notifications = require("sdk/notifications");

var notifyImg = "./icon-32-white.png";
var apiKey = "";
var selectedText = '';

function textSelection(event){
    if (selection.isContiguous) {
        selectedText = selection.text;
    }
}

function setLangTo(){
   var langTo = require('sdk/simple-prefs').prefs['translateTo'];
   console.log("langTo: " + langTo);
   return langTo;
}

selection.on('select', textSelection);

var button = ActionButton({
    id: "hot-translator",
    label: "Hot Translator",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
    },
    onClick: function(state) {
        var langTo = setLangTo();
        tabs.open("https://translate.yandex.ru/?text=" + selectedText + "&lang=" + langTo);
    }
});

var HotKeyPress = Hotkey({
    combo: "alt-q",
    onPress: function() {
        var langTo = setLangTo();
        var canSelectedText = encodeURIComponent(selectedText);
        var resultUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + apiKey + "&lang=" + langTo + "&text=" + canSelectedText;

        Request({
            url: resultUrl,
            onComplete: function (response) {
                var translated = response.json.text[0];
                notifications.notify({
                    text: translated,
                    iconURL: notifyImg
                });
            }
        }).get();
    }
});

